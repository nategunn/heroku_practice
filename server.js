var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'./client')));
require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);
//set up a static file server that points to the 'client' directory
app.listen(8000,function(){
	console.log('mean exam 6 on 8000');
});