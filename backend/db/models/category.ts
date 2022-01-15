export {}
const mongoose = require('mongoose')
// TODO: Rewrite logic so choosing between income and expense isnt dealt via boolean, instead type
const categorySchema = mongoose.Schema({
    type: {
        type: String,
        enum: ['Income', 'Expense', 'NONE'],
        // required: true
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
