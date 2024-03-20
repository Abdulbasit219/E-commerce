const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    products: [],
    buyer: {
        type: mongoose.ObjectId,
        ref: "Users E-commerce"
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Delivered']
    },
    allowEdit: {
        type: String,
        default: 'yes',
    }
},
    { timestamps: true },
)

module.exports = mongoose.model('order', orderSchema)