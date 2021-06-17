var express = require('express');
var router = express.Router();
var createError = require('http-errors'); //상단에 추가
const jwt = require('jsonwebtoken');
const cfg = require('../../config')

// 토큰 decode
const verifyToken = (t) => {
  return new Promise((resolve, reject) => {
    jwt.verify(t, cfg.secretKey, (err, v) => {
      if (err) reject(err)
      resolve(v)
    })
  })
}
// api/  register,login 연결시키기  
router.use('/register', require('./register/register.js'))
router.use('/login', require('./login/localLogin.js'))


// 토큰 검사 
router.all('*', function(req, res, next) {
  const token = req.headers.authorization
  verifyToken(token)
    .then(v => {
      console.log(v)
      next()
    })
    .catch(e => res.send({ success: false, msg: e.message }))  
});
// 잘못들어온 url 처리 해주기 
router.all('*', function(req, res, next) {
  next(createError(404, '그런 api 없어'));
});

module.exports = router;

