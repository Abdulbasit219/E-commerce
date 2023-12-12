const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    question:{
        type: String,
        required: true
    },
    isAdmin: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model('Users E-commerce',UserSchema);