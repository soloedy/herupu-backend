'use strict'

var express = require('express');
var UserCollaboratorController = require('../controllers/user-collaborator');
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');

var api = express.Router();

api.post('/register-collaborator', UserCollaboratorController.register);
api.post('/login-collaborator', UserCollaboratorController.login);

module.exports = api;