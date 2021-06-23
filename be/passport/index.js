const passport = require('passport');
const kakao = require('./kakaoStrategy');
const naver = require('./naverStrategy');
const User = require('../models/users');

module.exports = () => {

    kakao();
    naver();
    
}
