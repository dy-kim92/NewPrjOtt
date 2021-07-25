var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const User = require('../../../models/users')

router.get('/', function(req, res, next) {
    User.find()
        .then(r => {
            res.send({ success: true, users: r })
        })
        .catch(e => {
            res.send({ success: false })
         })
});

router.post('/', (req, res, next) => {
    // console.log(req.body)
    // const { name, email, password } = req.body
    // const u = new User({ name, email, password})
    // console.log('this is u.email', u.email)
    // let existEmail = User.findOne({email:u.email})
    // console.log(existEmail)
    // if (existEmail){
    //     console.log('이메일이 이미 존재합니다.')}
  const u = req.body
  User.findOne({ email: u.email })
    .then((r) => {
      if (r) throw new Error('This is a registered ID')
      return User.create(u)
    })
    .then((r) => {
      res.send({ success: true })
    })
    .catch((e) => {
      res.send({ success: false, msg: e.message })
    })
    // } else {
    //     // db 저장 
    //     u.save()
    //     .then(r => {
            
    //     })
    //     .catch(e => {
    //         res.send({ success: false, msg: e.message })
    //     })
    // }   
    // User.findOne({ email: u.email })
    // .then((r) => {
    //     if (r) throw new Error('이미 등록되어 있는 아이디입니다.')
    //     // else u.save()
    // })
    // .catch((e) => {
    //     res.send({ success: false, msg: e.message })
    // })
})

router.all('*', function(req, res, next) {
    next(createError(404, '404 error'));
  });

module.exports = router;