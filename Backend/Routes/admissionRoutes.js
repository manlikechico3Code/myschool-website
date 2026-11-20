const express = require('express');
const {
  getAdmissions,
  createAdmission,
  updateAdmissionStatus,
} = require('../Controllers/admissionController');

const router = express.Router();

router.get('/', getAdmissions);
router.post('/', createAdmission);
router.patch('/:id/status', updateAdmissionStatus);

module.exports = router;