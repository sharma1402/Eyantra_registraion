const registrationService = require('../services/registrationService');
const { YEARS, DOMAINS, GENDERS } = require('../constants/formOptions');

async function getCountries(req, res, next) {
    try{
        res.json(await registrationService.getCountryNames());
    } catch (err) {
        next(err);
    }
}

async function getColleges(req, res, next) {
  try {
    res.json(await registrationService.getCollegeNames());
  } catch (err) { next(err) }
}

function getMeta(req, res) {
  res.json({ years: YEARS, domains: DOMAINS, genders: GENDERS });
}

module.exports = { getCountries, getColleges, getMeta };