const mongoose = require('mongoose')

const Notes = new mongoose.Schema({
    date: String,
    mood: String,
    desc: String,
    timestamp: Date,
})

module.exports = mongoose.model('Notes',Notes)