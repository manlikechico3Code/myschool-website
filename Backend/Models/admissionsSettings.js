const mongoose = require('mongoose');

const admissionsSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: 'admissions' },
    opensAt: { type: Date, required: true },
    closesAt: { type: Date, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('AdmissionsSettings', admissionsSettingsSchema);
