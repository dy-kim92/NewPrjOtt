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
      jwt.sign({_id, email, name }, cfg.jwt.secretKey, o, (err, token) => {
        if (err) reject(err)
        resolve(token)
      })
    })
  }
// login ============================================================
router.post('/', (req, res) => {
    const { email, password, remember } = req.body
    if (!email) return res.send({ success: false, msg: 'invalid email'})
    if (!password) return res.send({ success: false, msg: 'invalid password'})
    if (remember === undefined) return res.send({ success: false, msg: 'invalid checkbox'})
    User.findOne({ email })
      .then((r) => {
        // console.log(r)
        if (!r) throw new Error('ID does not exist')
        if (r.password !== password) throw new Error('password is wrong')
        return signToken(r._id, r.email, r.name, remember)
      })
      .then((r) => {
        console.log(r)
        res.cookie("userCookie", r, { httpOnly: true, signed:true });
        res.send({ success: true, token: r })
      })
      .catch((e) => {
        res.send({ success: false, msg: e.message })
      })
  })


router.all('*', function(req, res, next) {
    next(createError(404, '404 error'));
  });

module.exports = router;