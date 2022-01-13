export {}
const mongoose = require('mongoose')
//Date
//Name
//Description
//Amount
//Category -> Category has its own schema, a different collection
// TODO: Change the design of the schema so fields are required.
// TODO: Transaction must have field for User
const transactionSchema = new mongoose.Schema({
    date: String,
    name: String,
    description: String,
    amount: Number,
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
}, {timestamps: true})

module.exports = mongoose.model("Transaction", transactionSchema);
