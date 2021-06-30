var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Board = require('../../../models/boards')
const Movie = require('../../../models/movies')
const MvComment = require('../../../models/mvcomments')
router.get('/list/review', (req, res, next) => {
    let {search, skip, limit } = req.query
    skip = parseInt(skip)
    limit = parseInt(limit)
    let total = 0
    Movie.countDocuments()
        .where('title_kr').regex(search)
        .then(r => {
            total = r
            return Movie.find()
                .where('title_kr').regex(search)
                .skip(skip)
                .limit(limit)
        })
        .then(rs => {
            res.send({ success: true, t: total, ds: rs, token: req.token})
          })
        .catch(e => {
            res.send({ success: false, msg: e.message })
        })
});


// 상세 페이지
router.get('/read/:_id', (req, res, next) => {
    let atc = {}
    Movie.findByIdAndUpdate(req.params._id,{ new: true }).lean()
      .then(r => {
        atc = r
        atc._comments = []
        return MvComment.find({ _movie: atc._id }).populate({ path: '_user', select: 'id name'}).sort({ _id: 1 }).limit(5)
      })
      .then(rs => {
          if (rs) atc._comments = rs
        res.send({ success: true, d: atc, token: req.token })
      })
      .catch(e => {
        console.log("fail")
        res.send({ success: false, msg: e.message })
      })
  })






module.exports = router;











module.exports = router;