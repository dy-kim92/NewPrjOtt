const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
const boardSchema = new mongoose.Schema({
  name: { type: String, default: '', index: true, unique: true },
  rmk: { type: String, default: '' }
})

module.exports = mongoose.model('Board', boardSchema)