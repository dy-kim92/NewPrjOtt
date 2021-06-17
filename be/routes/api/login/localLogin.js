var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const jwt = require('jsonwebtoken')
const cfg = require('../../../config')
const User = require('../../../models/users')

const signToken = (id, name) => {
    return new Promise((resolve, reject) => {
      jwt.sign({ id, name }, cfg.secretKey, (err, token) => {
        if (err) reject(err)
        resolve(token)
      })
    })
  }
// router.post('/', (req, res, next) => {
//     // console.log(req.body)
//     var localEmail = req.body.email;
//     var localPassword = req.body.password;
//     var findLocalUser = {
//         email: localEmail,
//         password: localPassword
//     }
//     // id, pwd db에서 검색
//     User.findOne(findLocalUser)
//         .exec(function (err, user){
//             if (err){
//                 res.json({
//                     success: false, 
//                     data:"Error occured:" + err 
//                 });
//             } else if (!user){
//                 res.json({
//                     success: false, 
//                     data:"Incorrect email/password"
//                 });
//             } else if(user){
//                 res.json({
//                     type: true,
//                     data: user,
                
//                 });
//             }
//         })
// })
router.post('/', (req, res) => {
    console.log(cfg.secretKey)
    const { email, password } = req.body
    if (!email) return res.send({ success: false, msg: '아이디가 없습니다.'})
    if (!password) return res.send({ success: false, msg: '비밀번호가 없습니다.'})
  
    User.findOne({ email })
      .then((r) => {
        if (!r) throw new Error('존재하지 않는 아이디입니다.')
        if (r.password !== password) throw new Error('비밀번호가 틀립니다.')
        return signToken(r.email, r.name)
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