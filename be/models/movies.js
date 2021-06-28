const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
const movieSchema = new mongoose.Schema({
  title_kr: { type: String, default: '', index: true },
  title_en: { type: String, default: '' },
  genre: { type: String, default: '' },
  release: { type: String, default: '' },
  img: { type: String, default: '' },
  tomato: { type: String, default: '' },
  director: { type: String, default: '' },
  actor: { type: String, default: '' },
  synopsis: { type: String, default: '' },
  rate:{ type: String, default: '' },
  comments: [],
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  _board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', index: true }
})
module.exports = mongoose.model('Movie', movieSchema)