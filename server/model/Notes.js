const mongoose = require('mongoose')

const Notes = new mongoose.Schema({
    userId: {type: String, required: true},
    date: String,
    mood: String,
    desc: String,
}, {
    timestamps: true,
    toJSON: { virtuals: true},
    toObject: { virtuals: true}
});

module.exports = mongoose.model('Notes',Notes)