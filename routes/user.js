'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');

var api = express.Router();

api.post('/register', UserController.register);
api.post('/login', UserController.login);

module.exports = api; 