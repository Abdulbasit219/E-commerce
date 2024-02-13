const mongoose = require('mongoose');

const createCategory = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
        unique: true
    },
    slug: {
        type: 'string',
        lowercase: true
    }
})

module.exports = mongoose.model('Category', createCategory);