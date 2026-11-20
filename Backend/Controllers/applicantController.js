const Admission = require('../Models/admission');
const {
  clearApplicantCookie,
  createSessionToken,
  hashToken,
  readApplicantCookie,
  setApplicantCookie,
  SESSION_MAX_AGE,
  verifyPassword,
} = require('../utils/applicantAuth');

const loginApplicant = async (req, res, next) => {
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = typeof req.body?.password === 'string' ? req.body.password : '';

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const admission = await Admission.findOne({ email }).select('+passwordHash');
    if (!admission || !(await verifyPassword(password, admission.passwordHash || ''))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = createSessionToken();
    await Admission.updateOne(
      { _id: admission._id },
      {
        $set: {
          sessionTokenHash: hashToken(token),
          sessionExpiresAt: new Date(Date.now() + SESSION_MAX_AGE),
        },
      },
    );

    setApplicantCookie(res, token);
    res.json({ message: 'Signed in successfully' });
  } catch (error) {
    next(error);
  }
};

const getCurrentApplicant = async (req, res, next) => {
  try {
    const admission = await Admission.findById(req.applicantId);
    if (!admission) {
      clearApplicantCookie(res);
      return res.status(401).json({ message: 'Applicant account not found' });
    }
    res.json({ admission });
  } catch (error) {
    next(error);
  }
};

const logoutApplicant = async (req, res, next) => {
  const token = readApplicantCookie(req);
  try {
    if (token) {
      await Admission.updateOne(
        { sessionTokenHash: hashToken(token) },
        { $unset: { sessionTokenHash: 1, sessionExpiresAt: 1 } },
      );
    }
    clearApplicantCookie(res);
    res.json({ message: 'Signed out successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCurrentApplicant, loginApplicant, logoutApplicant };
