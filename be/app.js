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
<<<<<<< HEAD

//  passport
const passport = require('passport');
const passportConfig = require('./passport');
var app = express();
passportConfig();

const mongoose = require('mongoose');
const { decode } = require('punycode');
=======
const passport = require('passport'); // 소셜로그인
const passportConfig = require('./passport');
var app = express();
passportConfig();
const mongoose = require('mongoose')
>>>>>>> 68615bc637592a0a90ad09eefd4c9288ac3264b4

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
<<<<<<< HEAD
//  cors
app.use(cors({
  origin: true,
  credentials: true
}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
=======
app.use(cors()) // 외부요청 허용
// 소셜로그인

app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
>>>>>>> 68615bc637592a0a90ad09eefd4c9288ac3264b4
app.use('/api', require('./routes/api/api.js'))
app.use(history())
// be bulid 수정
app.use(express.static(path.join(__dirname, 'fe', 'dist')));
<<<<<<< HEAD
=======
app.use('/users', usersRouter);
>>>>>>> 68615bc637592a0a90ad09eefd4c9288ac3264b4
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

<<<<<<< HEAD
module.exports = app;
=======

// User.findOne()
//   .then(r => console.log(r.id, r._id)) // 60ca123d5253fc334ca9581b
//
// //
// Board.findOne()
//   .then(r => console.log(r.name, r._id)) // 60cff1ed057bd394e5195cf7

// Article.create({ title: 'ccc', content: 'ccc', _user: '60ca123d5253fc334ca9581b', _board: '60cff1ed057bd394e5195cf7' })
//   .then(r => console.log(r))

// const User = require('./models/users')
// const Board = require('./models/boards')
// const Article = require('./models/articles')
// Article.find({ _board: '60cff1ed057bd394e5195cf7'})
//   .populate('_user', 'name')
//   .populate('_board')
//   .then(r => console.log(r))
// let c = new Date(parseInt('60ca123d'.substring(0, 8), 16) * 1000).toLocaleString()
// console.log(c)
module.exports = app;
>>>>>>> 68615bc637592a0a90ad09eefd4c9288ac3264b4
