const { createHash, randomBytes } = require('crypto');

const COOKIE_NAME = 'admin_session';
const SESSION_MAX_AGE = 8 * 60 * 60 * 1000;
const sessions = new Map();

const hashToken = (token) => createHash('sha256').update(token).digest('hex');

const createAdminSession = () => {
  const token = randomBytes(32).toString('hex');
  sessions.set(hashToken(token), Date.now() + SESSION_MAX_AGE);
  return token;
};

const isAdminSessionValid = (token) => {
  if (!token) {
    return false;
  }

  const sessionKey = hashToken(token);
  const expiresAt = sessions.get(sessionKey);
  if (!expiresAt || expiresAt <= Date.now()) {
    sessions.delete(sessionKey);
    return false;
  }
  return true;
};

const revokeAdminSession = (token) => {
  if (token) {
    sessions.delete(hashToken(token));
  }
};

const readAdminCookie = (req) => {
  const cookie = (req.headers.cookie || '')
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`));

  return cookie ? cookie.slice(COOKIE_NAME.length + 1) : '';
};

const setAdminCookie = (res, token) => {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });
};

const clearAdminCookie = (res) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
};

module.exports = {
  clearAdminCookie,
  createAdminSession,
  isAdminSessionValid,
  readAdminCookie,
  revokeAdminSession,
  setAdminCookie,
};
