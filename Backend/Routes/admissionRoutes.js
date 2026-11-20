const express = require('express');
const {
  getAdmissions,
  getAdmissionsWindowStatus,
  createAdmission,
  updateAdmissionStatus,
} = require('../Controllers/admissionController');

const router = express.Router();

router.get('/', getAdmissions);
router.get('/window', getAdmissionsWindowStatus);
router.post('/', createAdmission);
router.patch('/:id/status', updateAdmissionStatus);

module.exports = router;