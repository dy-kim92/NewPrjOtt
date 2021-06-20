var express = require('express');
var router = express.Router();
const passport = require('passport')
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const KakaoStrategy = require('passport-kakao').Strategy;
const jwt = require('jsonwebtoken')
const User = require('../models/users')

const cfg = require('../config')
const signToken = (email, name) => {
    return new Promise((resolve, reject) => {
      const o = {
        subject: cfg.jwt.subject,
        expiresIn: cfg.jwt.expiresIn, // 3분
        algorithm: cfg.jwt.algorithm
      }
      jwt.sign({ email, name }, cfg.jwt.secretKey, o, (err, token) => {
        if (err) reject(err)
        resolve(token)
      })
    })
  }
router.get('/logout', isLoggedIn, (req, res) => {
    console.log('로그아웃!')
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/'
}), (req, res) => {
    const email = req.user.email
    User.findOne({ email })
      .then((r) => {
        if (!r) throw new Error('존재하지 않는 아이디입니다.')
        return signToken(r.email, r.name)
      })
      .then((r) => {
        console.log('성공',r)
        req.send({ success: true, token: r })
      })
      .catch((e) => {
        console.log('실패',r)

        res.send({ success: false, msg: e.message })

      })
    // console.log(req.user.name)
    res.redirect('/api')
    // const { code } = req.query;
});


module.exports = router;
