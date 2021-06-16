var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const User = require('../../../models/users')

router.post('/', (req, res, next) => {
    console.log(req.body)
    var localEmail = req.body.email;
    var localPassword = req.body.password;

    var findLocalUser = {
        email: localEmail,
        password: localPassword
    }
    // id, pwd db에서 검색
    User.findOne(findLocalUser)
        .exec(function (err, user){
            if (err){
                res.json({
                    success: false, 
                    data:"Error occured:" + err 
                });
            } else if (!user){
                res.json({
                    success: false, 
                    data:"Incorrect email/password"
                });
            } else if(user){
                res.json({
                    type: true,
                    data: user,
                });
            }
        })
})


router.all('*', function(req, res, next) {
    next(createError(404, '그런 api 없어'));
  });

module.exports = router;