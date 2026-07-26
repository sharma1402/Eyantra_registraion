const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/registrationController');

router.post('/register', ctrl.register);
router.get('/registrations', ctrl.list);

module.exports = router;