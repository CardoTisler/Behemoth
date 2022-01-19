export {}
const mongoose = require('mongoose')
// TODO: Change the design of the schema so fields are required.
// TODO: Transaction must have field for User
const transactionSchema = new mongoose.Schema({
    date: String,
    name: String,
    description: String,
    amount: Number,
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true})

module.exports = mongoose.model("Transaction", transactionSchema);
