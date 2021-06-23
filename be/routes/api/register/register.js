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
    console.log(req.body)
    const { name, email, password } = req.body
    const u = new User({ name, email, password})
    console.log('this is u.email', u.email)
    let existEmail = User.find({email:u.email})
    if (existEmail){
        console.log('이메일이 이미 존재합니다.')
    } else {
        // db 저장 
        u.save()
        .then(r => {
            res.send({ success: true, msg: r })
        })
        .catch(e => {
            res.send({ success: false, msg: e.message })
        })
    }   
})

router.all('*', function(req, res, next) {
    next(createError(404, '그런 api 없어'));
  });

module.exports = router;