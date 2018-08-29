'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollaboratorSchema = Schema({
    name: String,
    lastname: String,
    email: String,
    ocupation: String,
    experience: String,
    password: String,
    phone: String,
    image: String,
    role: String
});

module.exports = mongoose.model('Collaborator', CollaboratorSchema);