'use strict'

// modulos
var bcrypt = require('bcrypt-nodejs');
var constants = require('../utils/constants').constants;
var User = require('../models/user-collaborator');
var jwt = require('../services/jwt');

function register(req, res) {
    var user = new User();
    var params = req.body;

    if (params.name && params.lastname && params.email && params.password && params.phone && params.ocupation && params.experience) {

        user.name = params.name;
        user.lastname = params.lastname;
        user.email = params.email;
        user.phone = params.phone;
        user.role = 'ROLE_COLLABORATOR';
        user.ocupation = params.ocupation;
        user.experience = params.experience;
        user.image = null;

        User.findOne({email: user.email.toLowerCase()}, (err, issetUser) => {
            if (err) {
                res.status(500).send({
                    message: constants.ERROR_IN_REQUEST
                });
            } else {
                if (!issetUser) {
                    bcrypt.hash(params.password, null, null, (err, hash) => {
                        user.password = hash;

                        user.save((err, userStored) => {
                            if (err) {
                                res.status(500).send({
                                    message: constants.ERROR_IN_SAVE_USER
                                });
                            } else {
                                if (!userStored) {
                                    res.status(404).send({
                                        message: constants.USER_NOT_REGISTER
                                    });
                                } else {
                                    res.status(200).send({
                                        message: constants.USER_SUCCESS_STORED,
                                        user: userStored
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
function login(req, res) {
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, issetUser) => {
        if (err) {
            res.status(500).send({
                message: constants.ERROR_IN_REQUEST
            });
        } else {
            if (issetUser) {
                bcrypt.compare(password, issetUser.password, (err, check) => {
                    if (check) {
                        if (params.gettoken) {
                            res.status(200).send({
                                token: jwt.createToken(issetUser)
                            });
                        } else {
                            res.status(200).send({
                                issetUser
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

module.exports = {
    register,
    login
}
