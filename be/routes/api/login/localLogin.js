var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const jwt = require('jsonwebtoken')
const cfg = require('../../../config')
const User = require('../../../models/users')

const signToken = (_id, email, name, rmb) => {
    return new Promise((resolve, reject) => {
      const o = {
        subject: cfg.jwt.subject,
        expiresIn: cfg.jwt.expiresIn, // 3분
        algorithm: cfg.jwt.algorithm
      }
      if (rmb) o.expiresIn = cfg.jwt.expiresInRemember // 체크박스 체크시 6일
      jwt.sign({_id, email, name, rmb }, cfg.jwt.secretKey, o, (err, token) => {
        if (err) reject(err)
        resolve(token)
      })
    })
  }
// login ============================================================
router.post('/', (req, res) => {
    const { email, password, remember } = req.body
    if (!email) return res.send({ success: false, msg: '아이디가 없습니다.'})
    if (!password) return res.send({ success: false, msg: '비밀번호가 없습니다.'})
    if (remember === undefined) return res.send({ success: false, msg: '기억하기가 없습니다.'})
    User.findOne({ email })
      .then((r) => {
        if (!r) throw new Error('존재하지 않는 아이디입니다.')
        if (r.password !== password) throw new Error('비밀번호가 틀립니다.')
        return signToken(r._id, r.email, r.name, remember)
      })
      .then((r) => {
        res.send({ success: true, token: r })
      })
      .catch((e) => {
        res.send({ success: false, msg: e.message })
      })
  })


router.all('*', function(req, res, next) {
    next(createError(404, '그런 api 없어'));
  });

module.exports = router;