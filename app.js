var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var snakeRouter = require('./routes/snake');
var addmodsRouter = require('./routes/addmods');
var selectorRouter = require('./routes/selector');
var Costume = require("./models/costume"); 
var resourceRouter = require('./routes/resource');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/snake', snakeRouter);
app.use('/addmods', addmodsRouter);
app.use('/selector', selectorRouter);
app.use('/resource', resourceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const connectionString =  process.env.MONGO_CON 
mongoose = require('mongoose'); 
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});

async function recreateDB(){
  // Delete everything
  await Costume.deleteMany();
 
 
  var results = [{"name":"Asmodeus","color":'brown',"weight":30},
                 {"name":"Severus","color":'black',"weight":25},
                 {"name":"Bowie", "color":'gold',"weight":40}]
 
 for(i in results){
  let instance = new Costume({name: results[i]["name"], color: results[i]["color"], weight:results[i]["weight"]});
   instance.save( function(err,doc) {
     if(err) return console.error(err);
     console.log("object added.")
     });
 } 
 } 
 let reseed = true;
 if (reseed) { recreateDB();} 
module.exports = app;