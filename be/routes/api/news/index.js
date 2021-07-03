var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const News = require('../../../models/news')
// News 리스트 
router.get('/list/latest', (req, res, next) => {
    console.log('하이')
    News.find()
      .then(rs => {
        console.log('성공')
        res.send({ success: true, ds: rs, token: req.token})
      })
      .catch(e => {
        console.log('실패')
        res.send({ success: false, msg: e.message })
      })
  });
module.exports = router;
