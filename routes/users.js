var express = require('express');
const { route } = require('.');
var router = express.Router();
const userController = require('../controller/user');

router.post('/', userController.createUser);

module.exports = router;
