const passport = require('passport');
const kakao = require('./kakaoStrategy');
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