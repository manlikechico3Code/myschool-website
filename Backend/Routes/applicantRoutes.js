const express = require('express');
const {
  getCurrentApplicant,
  loginApplicant,
  logoutApplicant,
} = require('../Controllers/applicantController');
const requireApplicant = require('../Middleware/applicantAuthMiddleware');

const router = express.Router();

router.post('/login', loginApplicant);
router.get('/me', requireApplicant, getCurrentApplicant);
router.post('/logout', logoutApplicant);

module.exports = router;
