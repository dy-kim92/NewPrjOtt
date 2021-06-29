const User = require('./models/users')
const Board = require('./models/boards')
var Movie = require('./models/movies');
const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/nemv', { useNewUrlParser: true }, (err) => {
//    if (err) return console.error(err)
//    console.log('mongoose connected!')
// })
// Movie.create({"title_kr":"2"})
const spawn = require('child_process').spawn; 
const result = spawn('python', ['24.py']); 
result.stdout.on('data', (data) => {
    dataTosend = data.toString()
    console.log(dataTosend)
});
// console.log(dataTosend)