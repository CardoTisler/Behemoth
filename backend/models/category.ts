export {}
const mongoose = require('mongoose')
//just category that takes String input

const categorySchema = mongoose.Schema({
    type: {
        type: String,
        enum: ['Income', 'Expense', 'NONE']
    },
    name: String,
    budget: Number
})

module.exports = mongoose.model("Category", categorySchema)