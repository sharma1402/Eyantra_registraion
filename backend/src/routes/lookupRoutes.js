const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/lookupController');

router.get('/countries', ctrl.getCountries);
router.get('/colleges', ctrl.getColleges);
router.get('/meta', ctrl.getMeta);

module.exports = router;