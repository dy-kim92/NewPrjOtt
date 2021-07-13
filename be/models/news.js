const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
const newsSchema = new mongoose.Schema({
  title: { type: String, default: '', index: true, unique: true },
  media: { type: String, default: '' },
  time: { type: String, default: '' },
  link: { type: String, default: '' },
})

module.exports = mongoose.model('NEWS', newsSchema)