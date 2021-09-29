export {}
const mongoose = require('mongoose')
//Date
//Name
//Description
//Amount
//Category -> Category has its own schema, a different collection
interface Transaction {
    date: String,
    
}
//TODO: Convert date: String to date: Date
const transactionSchema = new mongoose.Schema({
    date: String,
    name: String,
    description: String,
    amount: Number,
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
})

module.exports = mongoose.model("Transaction", transactionSchema);
