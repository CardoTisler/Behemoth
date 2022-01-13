export {}
const mongoose = require('mongoose')
// TODO: Change the design of the schema so type and name are required, decide what to do with budget if Income cat.
// TODO: Category must have field for User.
const categorySchema = mongoose.Schema({
    type: {
        type: String,
        enum: ['Income', 'Expense', 'NONE']
    },
    name: String,
    budget: Number
}, {timestamps: true})

module.exports = mongoose.model("Category", categorySchema)
