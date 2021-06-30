const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
const MvcommentSchema = new mongoose.Schema({
  content: { type: String, default: '' },
  cnt: {
    view: { type: Number, default: 0 },
    like: { type: Number, default: 0 }
  },
  ip: { type: String, default: '' },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, default: null },
  _movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', index: true }
})

module.exports = mongoose.model('MvComment', MvcommentSchema)