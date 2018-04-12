const express = require('express');
const controllers = require('../controller/controllers.js');
const router = express.Router();

router.get('/dashboard', controllers.getDashboard);
router.get('/skills', controllers.getSkills);
router.get('/', controllers.getHome);



module.exports = router;
