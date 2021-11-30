// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// var mongoose = require('mongoose');
// var Snake = require("./models/snake");

// passport.use(new LocalStrategy(function(username, password, done) {
//   Account.findOne({ username: username }, function (err, user) {
//     if (err) { 
//       return done(err); 
//     }
//     if (!user) {
//       return done(null, false, { 
//         message: 'Incorrect username.' 
//       });
//     }
//     if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//     }
//     return done(null, user);
//   });
// }));

// const connectionString = process.env.MONGO_CON
// mongoose = require('mongoose');
// mongoose.connect(connectionString, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// // server start
// async function recreateDB() {
//   // Delete everything
//   await Snake.deleteMany();
//   let instance1 = new
//   Snake({
//     name: "Asmodeus",
//     color: 'brown',
//     weight: 30
//   });
//   let instance2 = new
//   Snake({
//     name: "Severus",
//     color: 'black',
//     weight: 25
//   });
//   let instance3 = new
//   Snake({
//     name: "Bowie",
//     color: 'black',
//     weight: 40
//   });  
//   instance1.save(function (err, doc) {
//     if (err) return console.error(err);
//     console.log("First object saved")
//   });
//   instance2.save(function (err, doc) {
//     if (err) return console.error(err);
//     console.log("Second object saved")
//   });
//   instance3.save(function (err, doc) {
//     if (err) return console.error(err);
//     console.log("Third object saved")
//   });
// }

// let reseed = true;
// if (reseed) {
//   recreateDB();
// }


// // We can seed the collection if needed on

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var snakeRouter = require('./routes/snake');
// var addmodsRouter = require('./routes/addmods');
// var selectorRouter = require('./routes/selector');
// var resourceRouter = require('./routes/resource');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({
//   extended: false
// }));
// app.use(cookieParser());
// app.use(require('express-session')({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false
//  }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(express.static(path.join(__dirname, 'public')));


// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport'); 
var LocalStrategy = require('passport-local').Strategy; 
passport.use(new LocalStrategy( 
  function(username, password, done) { 
    Account.findOne({ username: username }, function (err, user) { 
      if (err) { return done(err); } 
      if (!user) { 
        return done(null, false, { message: 'Incorrect username.' }); 
      } 
      if (!user.validPassword(password)) { 
        return done(null, false, { message: 'Incorrect password.' }); 
      } 
      return done(null, user); 
    }); 
  }));
const connectionString =  process.env.MONGO_CON 
mongoose = require('mongoose'); 
mongoose.connect(connectionString,  {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection 
var db = mongoose.connection; 
 //Bind connection to error event  
db.on('error', console.error.bind(console, 'MongoDB connection error:')); 
db.once("open", function(){ console.log("Connection to DB succeeded")}); 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var snakeRouter = require('./routes/snake');
var addmodsRouter = require('./routes/addmods');
var selectorRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');

var snake = require("./models/snake"); 
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({ 
  secret: 'keyboard cat', 
  resave: false, 
  saveUninitialized: false 
})); 
app.use(passport.initialize()); 
app.use(passport.session()); 
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/snake', snakeRouter);
app.use('/addmods', addmodsRouter);
app.use('/selector', selectorRouter);
app.use('/resource', resourceRouter);

// passport config 
// Use the existing connection 
// The Account model  
var Account =require('./models/account'); 
 
passport.use(new LocalStrategy(Account.authenticate())); 
passport.serializeUser(Account.serializeUser()); 
passport.deserializeUser(Account.deserializeUser()); 

// We can seed the collection if needed on server start 
async function recreateDB(){ 
  // Delete everything 
  await snake.deleteMany(); 
  let instance1 = new snake({name:"Satish",  color:"black", weight:30}); 
  instance1.save( function(err,doc) { 
  if(err) return console.error(err); 
  console.log("First object saved") 
  }); 

  let instance2 = new snake({name:"harsha",  color:"brown", weight:25}); 
  instance2.save( function(err,doc) { 
  if(err) return console.error(err); 
  console.log("Second object saved") 
  }); 

  let instance3 = new snake({name:"pranay",  color:"white", weight:40}); 
  instance3.save( function(err,doc) { 
  if(err) return console.error(err); 
  console.log("Third object saved") 
  }); 

} 
let reseed = true; 
if (reseed) { recreateDB();} 
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

module.exports = app;