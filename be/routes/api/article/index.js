var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const User = require('../../../models/users')
const Board = require('../../../models/boards')
const Article = require('../../../models/articles')
router.get('/:_board', (req, res, next) => {
    const _board = req.params._board
    console.log('get_board', _board)
    const f = {}
    if (_board) f._board = _board
    Article.find(f).populate('_user','-password')
      .then(rs => {
        // console.log('찾기성공',rs)
        res.send({ success: true, ds: rs, token: req.token })
      })
      .catch(e => {
        res.send({ success: false, msg: e.message })
      })
  });
router.post('/:_board', (req, res, next) => {
    const _board = req.params._board
    if (!_board) return res.send({ success: false, msg: '게시판이 선택되지 않았습니다' }) // 나중에 400 bad request 처리 예제
    const { title, content } = req.body
    Board.findOne({ _id: _board })
      .then(r => {
        if (!r) return res.send({ success: false, msg: '잘못된 게시판입니다' })
        console.log("게시판잘찾아옴",r)
        const atc = {
          title,
          content,
          _board,
          ip: '1.1.1.1',//req.ip,
          // _user: null,
        }
        console.log('atc확인콘솔',atc)
        // console.log('atc 확인콘솔2')
        console.log(req.user)
        // if (req.user._id) atc._user = req.user._id
        return Article.create(atc)
      })
      .then(r => {
        console.log('성공했습ㄴ디ㅏ.')
        res.send({ success: true, d: r, token: req.token })
      })
      .catch(e => {
        res.send({ success: false, msg: e.message })
      })
  })

module.exports = router;
