var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    Account.findOne({ username: username })
      .then(function(user) {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(function(err) {
        return done(err);
      });
  }
));

// Import Furniture Model
const Furniture = require('./models/furniture');

let resourceRouter = require('./routes/resource'); // Route for our resource
var chooseRouter = require('./routes/choose'); // Search results for choose
var furnitureRouter = require('./routes/furniture');// Search results endpoint
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

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

require('dotenv').config();
const connectionString = process.env.MONGO_CON
const mongoose = require('mongoose');
mongoose.connect(connectionString);

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});

// Seeding Function
async function recreateDB(){
  //delete all existing instances
  await Furniture.deleteMany();

  //Create 3 New Instances
  let instance1 = new Furniture({
    name: 'Sofa',
    finish: 'Leather',
    price: 800
  });
  let instance2 = new Furniture({
    name: 'Table',
    finish: 'Wood',
    price: 370
  });
  let instance3 = new Furniture({
    name: 'Chair',
    finish: 'Metal',
    price: 150
  })

  //Save all instances
  instance1.save().then(doc=>{
    console.log('First instance saved')}
    ).catch(err=>{
    console.error(err)
    });

  instance2.save().then(doc=>{
    console.log('Second instance saved')}
  ).catch(err=>{
    console.error(err)
  });

  instance3.save().then(doc=>{
    console.log('Third instance saved')}
  ).catch(err=>{
    console.error(err)
  });

}

  //Set reseed to true to recreate database on server start 
  let reseed = true;

  if (reseed){
    recreateDB();
  }

app.use('/resource', resourceRouter);
app.use ('/choose', chooseRouter);
app.use('/board', (req, res) => {
  let query = req.query;
  console.log(`rows ${query.rows}`);
  console.log(`cols ${query.cols}`);
  res.render('board', {title:'Board', query:query});
});

app.use('/furniture', furnitureRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

// passport config
let Account = require('./models/account');

//Account authentication
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

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