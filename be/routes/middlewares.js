exports.isLoggedIn = (req, res, next) => {
<<<<<<< HEAD
=======
    console.log('istLoggenIn')
>>>>>>> 68615bc637592a0a90ad09eefd4c9288ac3264b4
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
<<<<<<< HEAD
=======
    console.log('isNotLoggenIn')
>>>>>>> 68615bc637592a0a90ad09eefd4c9288ac3264b4
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
};