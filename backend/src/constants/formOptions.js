const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year']
const DOMAINS = [
  'Computer Science', 'Information Technology', 'Electronics & Communication',
  'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering',
  'Robotics', 'Other'
]
const GENDERS = ['Male', 'Female', 'Other']

const NAME_REGEX = /^[A-Za-z ]{2,60}$/
const CONTACT_REGEX = /^[0-9]{10}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

module.exports = { YEARS, DOMAINS, GENDERS, NAME_REGEX, CONTACT_REGEX, EMAIL_REGEX }