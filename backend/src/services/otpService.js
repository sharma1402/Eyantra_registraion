const crypto = require('crypto')

const otpStore = new Map() // email -> { otp, expiresAt, verified }

function generateOtp(email) {
  const otp = crypto.randomInt(100000, 999999).toString()
  otpStore.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000, verified: false })
  console.log(`[DEV] OTP for ${email}: ${otp}`) // no SMTP wired up — see README
  return otp
}

function verifyOtp(email, otp) {
  const record = otpStore.get(email)
  if (!record) return { verified: false, error: 'No OTP requested for this email.' }
  if (Date.now() > record.expiresAt) return { verified: false, error: 'OTP expired.' }
  if (record.otp !== otp) return { verified: false, error: 'Incorrect OTP.' }
  record.verified = true
  return { verified: true }
}

function isVerified(email) {
  return otpStore.get(email)?.verified === true
}

function clear(email) {
  otpStore.delete(email)
}

module.exports = { generateOtp, verifyOtp, isVerified, clear }