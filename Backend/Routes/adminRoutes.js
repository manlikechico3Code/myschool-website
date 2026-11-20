const express = require('express');
const {
  getAdmissionsWindow,
  loginAdmin,
  logoutAdmin,
  updateAdmissionsWindow,
} = require('../Controllers/adminController');
const requireAdmin = require('../Middleware/adminAuthMiddleware');

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/logout', requireAdmin, logoutAdmin);
router.get('/admissions-window', requireAdmin, getAdmissionsWindow);
router.put('/admissions-window', requireAdmin, updateAdmissionsWindow);

module.exports = router;
