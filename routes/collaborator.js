'use strict'

var express = require('express');
var multipart = require('connect-multiparty');
var CollaboratorController = require('../controllers/collaborator');
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');

var api = express.Router();

api.post('/register-collaborator', CollaboratorController.registerCollaborator);
api.post('/login-collaborator', CollaboratorController.loginCollaborator);
api.get('/collaborators-homepage', md_auth.ensureAuth, CollaboratorController.getCollaborators);
api.get('/collaborator-profile/:id', md_auth.ensureAuth, CollaboratorController.getCollaborator);

module.exports = api;