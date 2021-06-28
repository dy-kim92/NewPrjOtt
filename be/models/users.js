const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, default: '', unique: true, index: true },
    email: { type: String, default: '' },
    password: { type: String, default: ''},
})
const User = mongoose.model('User', userSchema)
module.exports = User