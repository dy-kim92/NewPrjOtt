var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Board = require('../../../models/boards')
const Movie = require('../../../models/movies')

// router.get('/list/:_board', (req, res, next) => {
//     const _board = req.params._board
//     console.log(_board)
//     const f = {}
//     if (_board) f._board = _board
//     Movie.find(f).populate('_user', '-password')
//         .then(rs => {
//             console.log('this is rs',rs)
//             res.send({ success: true, ds: rs, token: req.token })
//         })
//         .catch(e => {
//             res.send({ success: false, msg: e.message })
//         })
// });







module.exports = router;











module.exports = router;