export {}
const mongoose = require('mongoose')
const categorySchema = mongoose.Schema({
    type: {
        type: String,
        enum: ['INCOME', 'EXPENSE', 'NONE'],
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    budget: {
        type: Number,
    },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true})

module.exports = mongoose.model("Category", categorySchema)
