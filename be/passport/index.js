const passport = require('passport');
const kakao = require('./kakaoStrategy');
<<<<<<< HEAD
const naver = require('./naverStrategy');
const User = require('../models/users');

module.exports = () => {

    kakao();
    naver();
    
}
=======
const User = require('../models/users');

module.exports = () => {
    passport.serializeUser((user, done) => {
        console.log('serializeUser')
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        console.log('deserializeUser')
        User.findOne({ where: { user } })
            .then(user => done(null, user))
            .catch(err => done(err));
    });
    kakao();
}
>>>>>>> 68615bc637592a0a90ad09eefd4c9288ac3264b4
