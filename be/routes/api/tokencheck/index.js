var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.get('/', function(req, res, next) {
<<<<<<< HEAD
    const us = [
      {
        name: '김김김',
        age: 14
      },
      {
        name: '이이이',
        age: 24
      }
    ]
    res.send({ users: us , token: req.token })
=======
    res.send('토큰체크 성공')
>>>>>>> 68615bc637592a0a90ad09eefd4c9288ac3264b4
  });
  
  router.all('*', function(req, res, next) {
    next(createError(404, '그런 api 없어'));
  });
  
  module.exports = router;