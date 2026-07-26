const otpService = require('../services/otpService');
const registrationService = require('../services/registrationService');
const { EMAIL_REGEX } = require('../constants/formOptions');

async function sendOtp(req, res, next) {
  try {
    const email = (req.body.email || '').trim().toLowerCase();
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }
    if (await registrationService.emailExists(email)) {
      return res.status(409).json({ error: 'This email is already registered.' });
    }
    const otp = otpService.generateOtp(email);
    res.json({ message: 'OTP generated.', devOtp: otp });
  } catch (err) { next(err) }
}

function verifyOtp(req, res) {
  const email = (req.body.email || '').trim().toLowerCase();
  const result = otpService.verifyOtp(email, String(req.body.otp || ''));
  res.status(result.verified ? 200 : 400).json(result);
}

module.exports = { sendOtp, verifyOtp };