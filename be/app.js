var createError = require('http-errors');
var express = require('express');
const session = require("express-session");
const dotenv = require("dotenv");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const history = require('connect-history-api-fallback')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const cors = require('cors') // 외부요청 허용
const jwt = require('jsonwebtoken'); // JWT

//  passport
const passport = require('passport');
const passportConfig = require('./passport');
var app = express();
passportConfig();

const mongoose = require('mongoose');
const { decode } = require('punycode');

mongoose.connect('mongodb://localhost:27017/nemv', { useNewUrlParser: true }, (err) => {
   if (err) return console.error(err)
   console.log('mongoose connected!')
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('asdfasdfsafd'));

//  cors
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(session({
  secret: "ThisSecretIsEqualToCustomKeyForEncryption.",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(express.static(path.join(__dirname, 'public')));
//  cors
app.use(cors({
  origin: true,
  credentials: true
}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', require('./routes/api/api.js'))
app.use(history())
// be bulid 수정
app.use(express.static(path.join(__dirname, 'fe', 'dist')));
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