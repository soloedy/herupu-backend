'use strict'

// modulos
var bcrypt = require('bcrypt-nodejs');
var constants = require('../utils/constants').constants;
var Collaborator = require('../models/collaborator');
var jwt = require('../services/jwt');

function registerCollaborator(req, res) {
    var collaborator = new Collaborator();
    var params = req.body;

    if (params.name && params.lastname && params.email && params.password && params.phone && params.ocupation && params.experience) {

        collaborator.name = params.name;
        collaborator.lastname = params.lastname;
        collaborator.email = params.email;
        collaborator.phone = params.phone;
        collaborator.role = 'ROLE_COLLABORATOR';
        collaborator.ocupation = params.ocupation;
        collaborator.experience = params.experience;
        collaborator.image = null;

        Collaborator.findOne({email: collaborator.email.toLowerCase()}, (err, issetCollaborator) => {
            if (err) {
                res.status(500).send({
                    message: constants.ERROR_IN_REQUEST
                });
            } else {
                if (!issetCollaborator) {
                    bcrypt.hash(params.password, null, null, (err, hash) => {
                        collaborator.password = hash;

                        collaborator.save((err, collaboratorStored) => {
                            if (err) {
                                res.status(500).send({
                                    message: constants.ERROR_IN_SAVE_USER
                                });
                            } else {
                                if (!collaboratorStored) {
                                    res.status(404).send({
                                        message: constants.USER_NOT_REGISTER
                                    });
                                } else {
                                    res.status(200).send({
                                        message: constants.USER_SUCCESS_STORED,
                                        collaborator: collaboratorStored
                                    });
                                }
                            }
                        })
                    })
                } else {
                    res.status(200).send({
                        message: constants.USER_NOT_REGISTER
                    });
                }
            }
        })
    } else {
        res.status(200).send({
            message: constants.WRONG_PARAMETERS
        });
    }
}
function loginCollaborator(req, res) {
    var params = req.body;

    var email = params.email;
    var password = params.password;

    Collaborator.findOne({email: email.toLowerCase()}, (err, issetCollaborator) => {
        if (err) {
            res.status(500).send({
                message: constants.ERROR_IN_REQUEST
            });
        } else {
            if (issetCollaborator) {
                bcrypt.compare(password, issetCollaborator.password, (err, check) => {
                    if (check) {
                        if (params.gettoken) {
                            res.status(200).send({
                                token: jwt.createToken(issetCollaborator)
                            });
                        } else {
                            res.status(200).send({
                                issetCollaborator
                            });
                        }
                    } else {
                        res.status(200).send({
                            message: constants.LOGIN_FAILED
                        });
                    }
                })
            } else {
                res.status(404).send({
                    message: constants.LOGIN_FAILED
                });
            }
        }
    });
}

function getCollaborators(req, res) {
    Collaborator.find({}).exec((err, collaborators) => {
        if (err) {
            res.status(500).send({
                message: constants.ERROR_IN_REQUEST
            });
        } else {
            if (!collaborators) {
                res.status(404).send({
                    message: constants.EMPTY_COLLABORATORS
                });
            } else {
                res.status(200).send({
                    collaborators
                });
            }
        }
    });
}

module.exports = {
    registerCollaborator,
    loginCollaborator,
    getCollaborators
}
