'use strict'

var express = require('express');
var CollaboratorController = require('../controllers/collaborator');
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');

var api = express.Router();

api.post('/register-collaborator', CollaboratorController.register);
api.post('/login-collaborator', CollaboratorController.login);

module.exports = api;