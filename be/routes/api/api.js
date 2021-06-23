var express = require('express');
var router = express.Router();
var createError = require('http-errors'); //상단에 추가
const jwt = require('jsonwebtoken');
const cfg = require('../../config')
const moment = require('moment') // 시간계산

// 토큰 체크
const verifyToken = (t) => {
  return new Promise((resolve, reject) => {
    jwt.verify(t, cfg.jwt.secretKey, (err, v) => {
      if (err) reject(err)
      resolve(v)
    })
  })
}
<<<<<<< HEAD

const signToken = (_id, email, name, rmb) => {
  return new Promise((resolve, reject) => {
    const o = {
      subject: cfg.jwt.subject,
      expiresIn: cfg.jwt.expiresIn, // 3분
      algorithm: cfg.jwt.algorithm
    }
    jwt.sign({_id, email, name, rmb }, cfg.jwt.secretKey, o, (err, token) => {
=======
const signToken = (_id, email, name, exp) => {
  return new Promise((resolve, reject) => {
    const o = {
      subject: cfg.jwt.subject,
      algorithm: cfg.jwt.algorithm,
      expiresIn: exp
    }
    jwt.sign({_id, email, name }, cfg.jwt.secretKey, o, (err, token) => {
>>>>>>> 68615bc637592a0a90ad09eefd4c9288ac3264b4
      if (err) reject(err)
      resolve(token)
    })
  })
}
<<<<<<< HEAD

=======
>>>>>>> 68615bc637592a0a90ad09eefd4c9288ac3264b4
const getToken = async(t) => {
  let vt = await verifyToken(t)
  const diff = moment(vt.exp * 1000).diff(moment(), 'seconds')
  // return vt
<<<<<<< HEAD
  // console.log(diff)
=======
  console.log(diff)
>>>>>>> 68615bc637592a0a90ad09eefd4c9288ac3264b4
  const expSec = (vt.exp - vt.iat)
  if (diff > expSec / cfg.jwt.expiresInDiv) return { user: vt, token: null }
  const nt = await signToken(vt._id, vt.email, vt.name, expSec)
  vt = await verifyToken(nt)
  return { user: vt, token: nt }
}
<<<<<<< HEAD

// api/  register,login,findpwd 연결시키기  
router.use('/register', require('./register/register.js'))
router.use('/login', require('./login/localLogin.js'))
// router.use('/findpwd', require('./findpwd/sendmail.js'))
=======
// api/  register,login,findpwd 연결시키기  
router.use('/register', require('./register/register.js'))
router.use('/login', require('./login/localLogin.js'))
router.use('/findpwd', require('./findpwd/sendmail.js'))

// router.use('/token', require('./tokencheck')) 
>>>>>>> 68615bc637592a0a90ad09eefd4c9288ac3264b4

// 토큰 검사 
router.all('*', function(req, res, next) {
  // console.log(token)
<<<<<<< HEAD
  getToken(req.signedCookies.userCookie)
    .then((v) => {
      console.log(v)
=======
  getToken(req.headers.authorization)
    .then((v) => {
      // console.log(v)
>>>>>>> 68615bc637592a0a90ad09eefd4c9288ac3264b4
      req.user = v.user
      req.token = v.token
      next()
    })
    .catch(e => res.send({ success: false, msg: '로그아웃, 재로그인후 이용해주세요.'})) 
});
router.use('/token', require('./tokencheck')) 
<<<<<<< HEAD

=======
router.use('/board', require('./board')) 
router.use('/article', require('./article'))
>>>>>>> 68615bc637592a0a90ad09eefd4c9288ac3264b4
// 잘못들어온 url 처리 해주기 
router.all('*', function(req, res, next) {
  next(createError(404, '그런 api 없어'));
});

module.exports = router;

