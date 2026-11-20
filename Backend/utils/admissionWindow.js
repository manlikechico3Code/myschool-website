const AdmissionsSettings = require('../Models/admissionsSettings');

const isAdmissionWindowOpen = (settings, now = new Date()) => Boolean(
  settings &&
  settings.opensAt <= now &&
  settings.closesAt > now,
);

const getAdmissionWindow = async () => AdmissionsSettings.findOne({ key: 'admissions' });

module.exports = { getAdmissionWindow, isAdmissionWindowOpen };
