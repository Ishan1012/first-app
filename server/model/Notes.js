const mongoose = require('mongoose')

const Notes = new mongoose.Schema({
    date: String,
    mood: String,
    desc: String,
    timestamp: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Notes',Notes)