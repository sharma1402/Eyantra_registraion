const pool = require('../config/db');

async function getCountryNames() {
    const [rows] = await pool.query('SELECT name FROM countries ORDER BY name');
    return rows.map(r => r.name);
}

async function getCollegeNames() {
  const [rows] = await pool.query('SELECT name FROM colleges ORDER BY name')
  return rows.map(r => r.name)
}

async function emailExists(email) {
  const [rows] = await pool.query(
    'SELECT 1 FROM registrations WHERE LOWER(email) = LOWER(?) LIMIT 1', [email]
  )
  return rows.length > 0
}

async function createRegistration(entry) {
  await pool.query(
    `INSERT INTO registrations (id, name, contact, gender, email, year, domain, country, college)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [entry.id, entry.name, entry.contact, entry.gender, entry.email,
     entry.year, entry.domain, entry.country, entry.college]
  )
  const [[row]] = await pool.query(
    'SELECT *, registered_at AS registeredAt FROM registrations WHERE id = ?', [entry.id]
  )
  return row
}

async function findRegistrations({ country, college }) {
  const clauses = []
  const params = []
  if (country) { clauses.push('country = ?'); params.push(country) }
  if (college) { clauses.push('college = ?'); params.push(college) }
  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : ''
  const [rows] = await pool.query(
    `SELECT *, registered_at AS registeredAt FROM registrations ${where} ORDER BY registered_at DESC`,
    params
  )
  return rows
}

module.exports = { getCountryNames, getCollegeNames, emailExists, createRegistration, findRegistrations }