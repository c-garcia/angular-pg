'use strict';


var express = require('express');
var app = express();



function logreq(req, res, next){
  let now = new Date();
  next();
  console.log(`${now}:${req.hostname}:${req.originalUrl}:${res.statusCode}`);
}

app.use(logreq);
app.use(express.static('public'));
app.use('/vendor', express.static('bower_components'));

app.use('/other', express.static('otherlibs'));

var apiv1 = express();
apiv1.get('/status', function(req,res){
  res.status(200).json({status: 'ok', time: new Date()})
});

app.use('/api/v1', apiv1);

app.listen(3000, function(){
  console.log('App started: ' + app.get('env'));
});
