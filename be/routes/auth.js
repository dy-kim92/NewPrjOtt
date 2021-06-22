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
    // console.log(req)
    // console.log('###kakao callback###')
    // const email = req.user.email
    // console.log(req.user)
    // console.log(req)
    // console.log(req.user.email)
    // console.log(req.authInfo)
    // req.send({token: req.authInfo})
    // localStorage.setItem('token', req.authInfo)
                // this.$store.commit('getToken')
                // this.$router.push('/') 
    // User.findOne({ email })
    //   .then((r) => {
    //     console.log(r)
    //     res.send({success:true, token:req.authInfo})
    //   })
    //   .catch((e) => {
    //     console.log('실패',e)
    //     res.send({ success: false, msg: e.message })
    //   })
    // console.log(req.user.name)
    res.redirect('/')
    // const { code } = req.query;
});


module.exports = router;
