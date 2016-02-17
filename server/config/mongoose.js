var mongoose = require('mongoose');
var fs = require('fs');
var uri
mongoose.connect('mongodb://<nategunn2000@gmail.com>:<L2u3c4y5B6>@ds011218.mongolab.com:11218/heroku_90bp8hpr');
var models_path = __dirname + '/../models';
fs.readdirSync(models_path).forEach(function(file) {
    if(file.indexOf('.js') > 0) {
    	require(models_path + '/' + file);
    }
})