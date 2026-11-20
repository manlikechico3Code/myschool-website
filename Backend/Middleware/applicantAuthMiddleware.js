const Admission = require('../Models/admission');
const { clearApplicantCookie, hashToken, readApplicantCookie } = require('../utils/applicantAuth');

const requireApplicant = async (req, res, next) => {
  const token = readApplicantCookie(req);
  if (!token) {
    return res.status(401).json({ message: 'Please sign in to your applicant portal' });
  }

  try {
    const admission = await Admission.findOne({
      sessionTokenHash: hashToken(token),
      sessionExpiresAt: { $gt: new Date() },
    }).select('_id');

    if (!admission) {
      clearApplicantCookie(res);
      return res.status(401).json({ message: 'Your session has expired. Please sign in again.' });
    }

    req.applicantId = admission._id;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = requireApplicant;
