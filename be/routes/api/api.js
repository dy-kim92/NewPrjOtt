var express = require('express');
var router = express.Router();
var createError = require('http-errors'); //상단에 추가

router.get('/', function(req, res, next) {
  res.send('나는 api입니다.');
});

// api/register 연결시키기  
router.use('/register', require('./register/register.js'))

// 잘못들어온 url 처리 해주기 
router.all('*', function(req, res, next) {
  next(createError(404, '그런 api 없어'));
});

module.exports = router;

