const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isVerified: {type: Boolean, default: false},
    verificationToken: String,
    isAdmin: {type: Boolean, default: false},
}, {
    timestamps: true,
    toJSON: { virtuals: true},
    toObject: { virtuals: true}
})

module.exports = mongoose.model('Users',userSchema);