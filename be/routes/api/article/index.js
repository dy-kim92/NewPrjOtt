var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const User = require('../../../models/users')
const Board = require('../../../models/boards')
const Article = require('../../../models/articles')
const Comment = require('../../../models/comments')
// board 리스트 
router.get('/list/:_board', (req, res, next) => {
    const _board = req.params._board
    // console.log('get_board', _board)
    // params 값 받아오기
    let { skip, limit } = req.query
    // console.log("skip,limit",skip,limit)
    skip = parseInt(skip)
    limit = parseInt(limit)
    let total = 0
    const f = {}
    if (_board) f._board = _board
    // Article 데이터개수 구하는 메서드
    Article.countDocuments(f)
      .where('title')
      .then(r => {
        // 데이터 total 값 세팅
        total = r
        // console.log('데이터 total 값', r)
        return Article.find(f)
          .where('title')
          .skip(skip)
          .limit(limit)
          .select('-content')
           //content, password 제외
          .populate('_user', '-password') 
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
  const _id = req.params._id
  let atc = {}
  // console.log('req.query', req.query)
  // 조회수  { new : true }원본이 아닌 수정 된 문서를 반환 lean => 문서 수정가능
  Article.findByIdAndUpdate(_id, { $inc: { 'cnt.view': 1 } }, { new: true }).lean()
    .select('content cnt')
    .then(r => {
      atc = r
      atc._comments = []
      return Comment.find({ _article: atc._id }).populate({ path: '_user', select: 'id name'}).sort({ _id: 1 }).limit(5)
    })
    .then(rs => {
      if (rs) atc._comments = rs
      console.log(rs)
      res.send({ success: true, d: atc, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})
// 글작성
router.post('/:_board', (req, res, next) => {
    const _board = req.params._board
    if (!_board) return res.send({ success: false, msg: '게시판이 선택되지 않았습니다' }) // 나중에 400 bad request 처리 예제
    const { title, content } = req.body
    Board.findById(_board)
      .then(r => {
        if (!r) return res.send({ success: false, msg: '잘못된 게시판입니다' })
        const atc = {
          title,
          content,
          _board,
          ip: '1.1.1.1',//req.ip,
          _user:null
        }
        if (req.user._id) atc._user = req.user._id
        return Article.create(atc)
      })
      .then(r => {
        // console.log('성공했습ㄴ디ㅏ.')
        res.send({ success: true, d: r, token: req.token })
      })
      .catch(e => {
        res.send({ success: false, msg: e.message })
      })
  })
// 글 수정
router.put('/:_id', (req, res, next) => {
  if (!req.user._id) return res.send({ success: false, msg: '게시물 수정 권한이 없습니다' })
  const _id = req.params._id
  console.log(req.body)
  Article.findById(_id)
    .then(r => {
      if (!r) throw new Error('게시물이 존재하지 않습니다')
      if (r._user.toString() !== req.user._id) throw new Error('본인이 작성한 게시물이 아닙니다')
      return Article.findByIdAndUpdate(_id, { $set: req.body}, { new: true })
    })
    .then(r => {
      res.send({ success: true, d: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})
//  추천 + 
router.put('/:_id/heart', (req, res, next) => {
  const _id = req.params._id
  console.log('like _id',_id)
  Article.findByIdAndUpdate(_id, { $inc: { 'cnt.like': 1 } }, { new: true })
    .select('content cnt.view cnt.like')
    .then(r => {
      res.send({ success: true, d: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})
// 글 삭제
router.delete('/:_id', (req, res, next) => {
  if (!req.user._id) return res.send({ success: false, msg: '게시물 수정 권한이 없습니다' })
  const _id = req.params._id

  Article.findById(_id).populate('_user')
    .then(r => {
      if (!r) throw new Error('게시물이 존재하지 않습니다')
      if (r._user.toString() !== req.user._id) 

      return Article.deleteOne({ _id })
    })
    .then(r => {
      res.send({ success: true, d: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})
module.exports = router;
