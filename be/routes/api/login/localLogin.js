var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const jwt = require('jsonwebtoken')
const cfg = require('../../../config')
const User = require('../../../models/users')

const signToken = (_id, email, name, rmb) => {
      const o = {
        subject: cfg.jwt.subject,
        expiresIn: cfg.jwt.expiresIn, // 3분
        algorithm: cfg.jwt.algorithm
      }
      var expiryDate = new Date( Date.now() + cfg.jwt.expiresIn); // 단위 ms
      
      if (rmb) {
        o.expiresIn = cfg.jwt.expiresInRemember // 체크박스 체크시 6일
        expiryDate = new Date( Date.now() + cfg.jwt.expiresInRemember);
      }

      // jwt.sign({_id, email, name, rmb }, cfg.jwt.secretKey, o, (err, token) => {
      //   if (err) reject(err)

      //   resolve(token)
      const token = jwt.sign(
        {
          id: _id,
          email: email,
          name: name
        },
        cfg.jwt.secretKey, o);
         //  httpOnly : 보안
         console.log("토큰생성: ", token)
      res.cookie("userCookie", token, { expires: expiryDate, httpOnly: true, signed:true });
      
      // })
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

        const o = {
          subject: cfg.jwt.subject,
          expiresIn: cfg.jwt.expiresIn, // 3분
          algorithm: cfg.jwt.algorithm
        }
        var expiryDate = new Date( Date.now() + cfg.jwt.expiresIn * 1000); // 단위 ms
        
        if (remember) {
          o.expiresIn = cfg.jwt.expiresInRemember // 체크박스 체크시 6일
          expiryDate = new Date( Date.now() + cfg.jwt.expiresInRemember * 1000);
        }
  
        const token = jwt.sign(
          {
            id: r._id,
            email: r.email,
            name: r.name
          },
        cfg.jwt.secretKey, o);
          //  httpOnly : 보안
        console.log("토큰생성: ", token)
        res.cookie("userCookie", token, { expires: expiryDate, httpOnly: true, signed:true });

        // return signToken(r._id, r.email, r.name, remember)
        // return res.send({success: true});
        return res.redirect('http://localhost:3000/'); 
      })
      // .then((r) => {
      //   console.log('111111111111')
      //   res.send({ success: true, token: r })
        // res.redirect('/');
      // })
      .catch((e) => {
        console.log('22222222222222')
        res.send({ success: false, msg: e.message })
      })
  })


router.all('*', function(req, res, next) {
    next(createError(404, '그런 api 없어'));
  });

module.exports = router;