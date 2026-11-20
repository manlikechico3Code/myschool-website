const AdmissionsSettings = require('../Models/admissionsSettings');
const {
  clearAdminCookie,
  createAdminSession,
  readAdminCookie,
  revokeAdminSession,
  setAdminCookie,
} = require('../utils/adminSession');

const loginAdmin = (req, res) => {
  const { email, password } = req.body || {};
  if (email !== 'manlikechicoc300@gmail.com' || password !== '123456') {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  setAdminCookie(res, createAdminSession());
  res.json({ success: true, message: 'Login successful' });
};

const logoutAdmin = (req, res) => {
  revokeAdminSession(readAdminCookie(req));
  clearAdminCookie(res);
  res.json({ success: true, message: 'Signed out successfully' });
};

const getAdmissionsWindow = async (_req, res, next) => {
  try {
    const settings = await AdmissionsSettings.findOne({ key: 'admissions' }).lean();
    res.json({
      opensAt: settings?.opensAt || null,
      closesAt: settings?.closesAt || null,
    });
  } catch (error) {
    next(error);
  }
};

const updateAdmissionsWindow = async (req, res, next) => {
  const opensAt = new Date(req.body?.opensAt);
  const closesAt = new Date(req.body?.closesAt);

  if (
    !req.body?.opensAt ||
    !req.body?.closesAt ||
    Number.isNaN(opensAt.getTime()) ||
    Number.isNaN(closesAt.getTime()) ||
    opensAt >= closesAt
  ) {
    return res.status(400).json({
      message: 'Provide a valid opening date and a closing date after it.',
    });
  }

  try {
    const settings = await AdmissionsSettings.findOneAndUpdate(
      { key: 'admissions' },
      { $set: { opensAt, closesAt } },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
    );
    res.json({
      message: 'Admission window saved',
      opensAt: settings.opensAt,
      closesAt: settings.closesAt,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdmissionsWindow,
  loginAdmin,
  logoutAdmin,
  updateAdmissionsWindow,
};
