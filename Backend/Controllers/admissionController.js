const mongoose = require('mongoose');
const {
  createSessionToken,
  hashPassword,
  hashToken,
  setApplicantCookie,
} = require('../utils/applicantAuth');
const Admission = require('../Models/admission');
const AdmissionsSettings = require('../Models/admissionsSettings');
const { isAdmissionWindowOpen } = require('../utils/admissionWindow');

const getAdmissionsWindowStatus = async (_req, res, next) => {
  try {
    const settings = await AdmissionsSettings.findOne({ key: 'admissions' }).lean();
    res.json({
      isOpen: isAdmissionWindowOpen(settings),
      isUpcoming: Boolean(settings && settings.opensAt > new Date()),
      opensAt: settings?.opensAt || null,
      closesAt: settings?.closesAt || null,
    });
  } catch (error) {
    next(error);
  }
};

const getAdmissions = async (_req, res, next) => {
  try {
    const admissions = await Admission.find().sort({ createdAt: -1 });
    res.json(admissions);
  } catch (error) {
    next(error);
  }
};

const createAdmission = async (req, res, next) => {
  try {
    const settings = await AdmissionsSettings.findOne({ key: 'admissions' });
    if (!isAdmissionWindowOpen(settings)) {
      return res.status(403).json({ message: 'Admissions are currently closed.' });
    }

    const body = req.body || {};
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    const existingAdmission = await Admission.findOne({ email })
      .select('+passwordHash')
      .sort({ createdAt: -1 });

    if (existingAdmission) {
      return res.status(409).json({
        message: existingAdmission.passwordHash
          ? 'An account already exists for this email. Please sign in to the applicant portal.'
          : 'An application already exists for this email. Please contact the school to activate portal access.',
      });
    }

    const passwordHash = await hashPassword(password);
    const sessionToken = createSessionToken();
    const sessionExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const admission = await Admission.create({
      name: body.name,
      email,
      passwordHash,
      sessionTokenHash: hashToken(sessionToken),
      sessionExpiresAt,
      phone: body.phone,
      state: body.state,
      localGovernment: body.localGovernment,
      gender: body.gender,
      parentName: body.parentName,
      previousSchool: body.previousSchool,
      course: body.course,
      message: body.message,
    });

    setApplicantCookie(res, sessionToken);
    res.status(201).json({
      message: 'Admission submitted successfully',
      admission,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

const updateAdmissionStatus = async (req, res, next) => {
  const { status } = req.body;
  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Status must be approved or rejected' });
  }

  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid admission ID' });
  }

  try {
    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    );

    if (!admission) {
      return res.status(404).json({ message: 'Admission not found' });
    }

    res.json(admission);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdmissions,
  getAdmissionsWindowStatus,
  createAdmission,
  updateAdmissionStatus,
};