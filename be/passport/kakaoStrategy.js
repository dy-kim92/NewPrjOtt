const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const User = require('../models/users');
const jwt = require('jsonwebtoken')

const cfg = require('../config')
// const signToken = (email, name) => {
//     return new Promise((resolve, reject) => {
//       const o = {
//         subject: cfg.jwt.subject,
//         expiresIn: cfg.jwt.expiresIn, // 3분
//         algorithm: cfg.jwt.algorithm
//       }
//       jwt.sign({ email, name }, cfg.jwt.secretKey, o, (err, token) => {
//         if (err) reject(err)
//         resolve(token)
//       })
//     })
//   }
module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID: '5479403ac3d4fdfacf12f97f8cfbafe6',
        clientSecret: 'bFSgKkXYNajny5YYnk11QDSDdX4sjTde',
        callbackURL: 'http://localhost:3000/auth/kakao/callback'
    },async (accessToken, refreshToken, profile, done) => {
        // console.log('kakao profile', profile);
        // console.log('찾는중1',profile._json.kakao_account.email)
        // console.log(accessToken)
        try {
            const exUser = await User.findOne({
                email:profile._json.kakao_account.email
            });
            // console.log('this is exUser', exUser)
            if (exUser) {
                // let token = await signToken(exUser.email, exUser.name)
                // console.log('this is token',token)
                done(null, exUser);
            } else {
                const newUser = await User.create({
                    email: profile._json.kakao_account.email,
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