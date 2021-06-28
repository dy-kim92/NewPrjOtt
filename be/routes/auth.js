const express = require('express');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models/users');
var jwt = require('jsonwebtoken');
const cfg = require('../config/index');

const router = express.Router();

//  로그인 유저 쿠키 정보 GET
router.use('/info', function(req, res){
    var cookieLoginObj = req.signedCookies.userCookie;  // 암호화된 쿠키
    var decode = jwt.decode(cookieLoginObj, cfg.jwt.secretKey);
    res.json(decode);
  });

  //  로그아웃
router.get('/logout', function(req, res){
    res.clearCookie('userCookie');
    res.redirect('/');
});

//  카카오
router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', function (req, res, next) {
  passport.authenticate("kakao", (err, user) => {
    if (err || !user) 
    return res.redirect('http://localhost:3000/auth/kakao');
    req.login(user, (error) => {
      if (error) next(error);

      createCookie(user, res);

      // var cookieLoginObj = req.signedCookies.userCookie;  // 암호화된 쿠키
      // console.log("쿠키해독 : " , cookieLoginObj);  //  암호화된 쿠키 해독
      // var decode = jwt.decode(cookieLoginObj, cfg.jwt.secretKey);
      // console.log(decode);

      return res.redirect('http://localhost:3000/'); 
    });
  })(req, res);
});

//  네이버
router.get('/naver', passport.authenticate('naver'));

router.get('/naver/callback', function (req, res, next) {
  passport.authenticate("naver", (err, user) => {
    if (err || !user) return res.redirect('http://localhost:3000/auth/naver');
    req.login(user, (error) => {
      if (error) next(error);

      createCookie(user, res);

      // var cookieLoginObj = req.signedCookies.userCookie;  // 암호화된 쿠키
      // console.log("쿠키해독 : " , cookieLoginObj);  //  암호화된 쿠키 해독
      // var decode = jwt.decode(cookieLoginObj, cfg.jwt.secretKey);
      // console.log(decode);

      return res.redirect('http://localhost:3000/'); 
    });
  })(req, res);
});


//  토큰 발급, 쿠키 생성 함수
function createCookie(user, res){
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name
    }, // 토큰에 입력할 private 값
    cfg.jwt.secretKey, // 나만의 시크릿키
    { expiresIn: cfg.jwt.expiresIn,
      subject: cfg.jwt.subject,
      algorithm: cfg.jwt.algorithm } // 토큰 만료 시간
    );
    // var expiryDate = new Date( Date.now() + cfg.jwt.expiresIn * 1000 ); // 단위 ms
    
    //  httpOnly : 보안
    res.cookie("userCookie", token, { httpOnly: true, signed:true });
}

module.exports = router;
