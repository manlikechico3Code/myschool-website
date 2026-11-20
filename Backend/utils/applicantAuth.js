const {
  createHash,
  randomBytes,
  scrypt: scryptCallback,
  timingSafeEqual,
} = require('crypto');
const { promisify } = require('util');

const scrypt = promisify(scryptCallback);
const COOKIE_NAME = 'applicant_session';
const SESSION_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

const hashPassword = async (password) => {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = await scrypt(password, salt, 64);
  return `${salt}:${derivedKey.toString('hex')}`;
};

const verifyPassword = async (password, passwordHash) => {
  const [salt, storedKey] = passwordHash.split(':');
  if (!salt || !/^[a-f\d]{128}$/i.test(storedKey || '')) {
    return false;
  }

  const expectedKey = Buffer.from(storedKey, 'hex');
  const actualKey = await scrypt(password, salt, expectedKey.length);
  return timingSafeEqual(actualKey, expectedKey);
};

const createSessionToken = () => randomBytes(32).toString('hex');

const hashToken = (token) => createHash('sha256').update(token).digest('hex');

const setApplicantCookie = (res, token) => {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });
};

const clearApplicantCookie = (res) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
};

const readApplicantCookie = (req) => {
  const cookieHeader = req.headers.cookie || '';
  const cookie = cookieHeader.split(';').map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`));

  return cookie ? cookie.slice(COOKIE_NAME.length + 1) : '';
};

module.exports = {
  clearApplicantCookie,
  createSessionToken,
  hashPassword,
  hashToken,
  readApplicantCookie,
  setApplicantCookie,
  SESSION_MAX_AGE,
  verifyPassword,
};
