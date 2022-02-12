export {}
const mongoose = require('mongoose')
const transactionSchema = new mongoose.Schema({
    date: {
        type: String,
        // required: true
    },
    name: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        // required: true
    },
    amount: {
        type: Number,
        // required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        // required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
}, {timestamps: true})

module.exports = mongoose.model("Transaction", transactionSchema);
