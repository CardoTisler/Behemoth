const Joi = require("joi");

//transactions/new schema
const newTransactionSchema = Joi.object({
    date: Joi.date().required(),
    name: Joi.string().min(1).max(40).required(),
    description: Joi.string().min(1).max(60).required(),
    amount: Joi.number().precision(2).positive().required(),
    category: Joi.string().pattern(new RegExp('[0-9a-fA-F]{24}')).required()
})

const checkedTransactionsSchema = Joi.array().items(
        Joi.string().pattern(new RegExp('[0-9a-fA-F]{24}'))
    ).required()

const transactionAmountSchema = Joi.number().precision(2).positive().required();

module.exports = {
    newTransactionSchema,
    checkedTransactionsSchema,
    transactionAmountSchema
}
