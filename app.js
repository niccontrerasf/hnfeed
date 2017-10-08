var express = require('express');
var app = express();
var path = require("path");
const pug = require('pug');
var db = require('./connection.js');
var anynews = require('./db_fun.js');

var minutes = 60; 

app.locals.moment = require('moment');

db.createBd();
db.createColl();

app.use(express.static('public'));
app.use('/', require('./routes/api'));
app.set("view engine","pug");
app.set("views", path.join(__dirname, "views"));

//check every 60min since app starts to new hit and insert them to db if there are some.
setInterval(anynews.anynews(),(minutes*60*1000));

app.listen(80,()=>console.log('listen'))
