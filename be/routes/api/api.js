var express = require('express');
var router = express.Router();
var createError = require('http-errors'); //상단에 추가
const jwt = require('jsonwebtoken');
const cfg = require('../../config')

// 토큰 체크
const verifyToken = (t) => {
  return new Promise((resolve, reject) => {
    jwt.verify(t, cfg.jwt.secretKey, (err, v) => {
      if (err) reject(err)
      resolve(v)
    })
  })
}
// api/  register,login,findpwd 연결시키기  
router.use('/register', require('./register/register.js'))
router.use('/login', require('./login/localLogin.js'))
router.use('/findpwd', require('./findpwd/sendmail.js'))
// router.use('/token', require('./tokencheck')) 

// 토큰 검사 
router.all('*', function(req, res, next) {
  const token = req.headers.authorization
  // console.log(token)
  verifyToken(token)
    .then(v => {
      // console.log(v)
      console.log(new Date(v.exp * 1000))
      req.user = v
      next()
    })
    .catch(e => res.send({ success: false, msg: e.message }))  
});
router.use('/token', require('./tokencheck')) 

// 잘못들어온 url 처리 해주기 
router.all('*', function(req, res, next) {
  next(createError(404, '그런 api 없어'));
});

module.exports = router;

