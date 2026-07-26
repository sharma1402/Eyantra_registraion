const crypto = require('crypto');
const registrationService = require('../services/registrationService');
const otpService = require('../services/otpService');
const { NAME_REGEX, CONTACT_REGEX, EMAIL_REGEX, YEARS, DOMAINS, GENDERS } = require('../constants/formOptions');

function validate(body, countries, colleges) {
  const errors = {}
  if (!body.name || !NAME_REGEX.test(body.name.trim())) errors.name = 'Name must contain only letters and spaces (2-60 chars).'
  if (!body.contact || !CONTACT_REGEX.test(body.contact.trim())) errors.contact = 'Contact number must be exactly 10 digits.'
  if (!body.gender || !GENDERS.includes(body.gender)) errors.gender = 'Please select a valid gender.'
  if (!body.email || !EMAIL_REGEX.test(body.email.trim())) errors.email = 'Please enter a valid email address.'
  if (!body.year || !YEARS.includes(body.year)) errors.year = 'Please select a valid year.'
  if (!body.domain || !DOMAINS.includes(body.domain)) errors.domain = 'Please select a valid domain/department.'
  if (!body.country || !countries.includes(body.country)) errors.country = 'Please select a valid country.'
  if (!body.college || !colleges.includes(body.college)) errors.college = 'Please select a valid college.'
  return errors
}

async function register(req, res, next) {
  try {
    const body = req.body
    const [countries, colleges] = await Promise.all([
      registrationService.getCountryNames(),
      registrationService.getCollegeNames()
    ])
    const errors = validate(body, countries, colleges)

    const emailLower = (body.email || '').trim().toLowerCase()
    if (!otpService.isVerified(emailLower)) {
      errors.email = errors.email || 'Email is not verified. Please verify with the OTP sent.'
    }
    if (!errors.email && await registrationService.emailExists(emailLower)) {
      errors.email = 'This email is already registered.'
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors })
    }

    const entry = {
      id: crypto.randomUUID(),
      name: body.name.trim(), contact: body.contact.trim(), gender: body.gender,
      email: body.email.trim(), year: body.year, domain: body.domain,
      country: body.country, college: body.college
    }

    let saved
    try {
      saved = await registrationService.createRegistration(entry)
    } catch (dbErr) {
      if (dbErr.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ errors: { email: 'This email is already registered.' } })
      }
      throw dbErr
    }

    otpService.clear(emailLower)
    res.status(201).json({ message: 'Registration successful.', entry: saved })
  } catch (err) { next(err) }
}

async function list(req, res, next) {
  try {
    const { country, college } = req.query
    res.json(await registrationService.findRegistrations({ country, college }))
  } catch (err) { next(err) }
}

module.exports = { register, list };