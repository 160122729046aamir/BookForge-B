const express = require('express');
const router = express.Router();
const { adminController } = require('./user.controller.js');

router.post('/admin',adminController)

module.exports = router;