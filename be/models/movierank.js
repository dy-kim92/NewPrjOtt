const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
const movierankSchema = new mongoose.Schema({
  title: { type: String, default: '', index: true, unique: true },
  img: { type: String, default: '' },
  bookingrate: { type: String, default: '' },
  popular: { type: String, default: '' },

})

module.exports = mongoose.model('MOVIERANK', movierankSchema)