'use strict'

var mongoose = require('mongoose');
var port = process.env.PORT || 5000;
var app = require('./app');

// Conexión al servidor de Mongo.
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:Admin123@ds121982.mlab.com:21982/herupu'); // Indica que aplicación quiero levantar y base de datos. 
 
app.listen(port);

console.log('Herupu App is Running')

  