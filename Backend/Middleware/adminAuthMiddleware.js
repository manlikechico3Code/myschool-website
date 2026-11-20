const { isAdminSessionValid, readAdminCookie } = require('../utils/adminSession');

const requireAdmin = (req, res, next) => {
  if (!isAdminSessionValid(readAdminCookie(req))) {
    return res.status(401).json({ message: 'Please sign in as an administrator' });
  }
  next();
};

module.exports = requireAdmin;
