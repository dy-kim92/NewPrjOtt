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
const signToken = (_id, email, name, exp) => {
  return new Promise((resolve, reject) => {
    const o = {
      subject: cfg.jwt.subject,
      algorithm: cfg.jwt.algorithm,
      expiresIn: exp
    }
    jwt.sign({_id, email, name }, cfg.jwt.secretKey, o, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}
const getToken = async(t) => {
  let vt = await verifyToken(t)
  const diff = moment(vt.exp * 1000).diff(moment(), 'seconds')
  // return vt
  console.log(diff)
  const expSec = (vt.exp - vt.iat)
  if (diff > expSec / cfg.jwt.expiresInDiv) return { user: vt, token: null }
  const nt = await signToken(vt._id, vt.email, vt.name, expSec)
  vt = await verifyToken(nt)
  return { user: vt, token: nt }
}
// api/  register,login,findpwd 연결시키기  
router.use('/register', require('./register/register.js'))
router.use('/login', require('./login/localLogin.js'))
router.use('/findpwd', require('./findpwd/sendmail.js'))

// router.use('/token', require('./tokencheck')) 

// 토큰 검사 
router.all('*', function(req, res, next) {
  // console.log(token)
  getToken(req.headers.authorization)
    .then((v) => {
      // console.log(v)
      req.user = v.user
      req.token = v.token
      next()
    })
    .catch(e => res.send({ success: false, msg: '로그아웃, 재로그인후 이용해주세요.'})) 
});
router.use('/token', require('./tokencheck')) 
router.use('/board', require('./board')) 
router.use('/article', require('./article'))
// 잘못들어온 url 처리 해주기 
router.all('*', function(req, res, next) {
  next(createError(404, '그런 api 없어'));
});

module.exports = router;

