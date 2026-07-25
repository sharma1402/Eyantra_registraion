export const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

export const DOMAINS = [
  'Computer Science', 'Information Technology', 'Electronics & Communication',
  'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering',
  'Robotics', 'Other'
]

export const GENDERS = ['Male', 'Female', 'Other'];

export const VALIDATORS = {
    name: { test: v => /^[A-Za-z ]{2,60}$/.test(v.trim()), message: 'Letter and spaces only.' },
    contact: { test: v => /^[0-9]{10}$/.test(v.trim()), message: 'Must be exactly 10 digits number.' },
    email: { test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), message: 'Enter a valid email.' }
}
