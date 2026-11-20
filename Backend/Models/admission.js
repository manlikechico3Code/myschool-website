const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true, select: false },
    sessionTokenHash: { type: String, select: false },
    sessionExpiresAt: { type: Date, select: false },
    phone: { type: String, required: true, trim: true },
    state: { type: String, default: '', trim: true },
    localGovernment: { type: String, default: '', trim: true },
    gender: { type: String, default: 'Male', trim: true },
    parentName: { type: String, default: '', trim: true },
    previousSchool: { type: String, default: '', trim: true },
    course: { type: String, default: 'JSS 1', trim: true },
    message: { type: String, default: '', trim: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_document, result) {
        result.id = result._id.toString();
        delete result._id;
        delete result.__v;
        delete result.passwordHash;
        delete result.sessionTokenHash;
        delete result.sessionExpiresAt;
        return result;
      },
    },
  },
);

module.exports = mongoose.model('Admission', admissionSchema);
