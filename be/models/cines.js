const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
const cinesSchema = new mongoose.Schema({
  title: { type: String, default: '', index: true, unique: true },
  img: { type: String, default: '' },
  link: { type: String, default: '' },
})

module.exports = mongoose.model('CINE', cinesSchema)