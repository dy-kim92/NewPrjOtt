const passport = require('passport');
const NaverStrategy = require('passport-naver').Strategy;
const User = require('../models/users');

module.exports = () => {
    passport.use(new NaverStrategy({
        clientID: 'MpjA6l5H_UDbKpA9Mhqg',
        clientSecret: 'J0_bjel1P0',
        callbackURL: 'http://3.37.156.7/auth/naver/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        console.log('naver profile', profile);
        // console.log('이메일 찾기 : ', profile._json.email);
        // console.log('닉네임 찾기 : ', profile.displayName);
        try {
            const exUser = await User.findOne({
                email: profile._json.email
            });
            if (exUser) {
                done(null, exUser);
            } else {
                const newUser = await User.create({
                    email: profile._json.email,
                    name: profile.displayName,
                });
                done(null, newUser);
            }
        } catch (err) {
            console.error(err);
            done(err);
        }
    }));
};