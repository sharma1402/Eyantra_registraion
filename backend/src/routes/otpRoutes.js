const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/otpController')

router.post('/send-otp', ctrl.sendOtp)
router.post('/verify-otp', ctrl.verifyOtp)

module.exports = router