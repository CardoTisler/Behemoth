const Joi = require("joi");

//transactions/new schema
// TODO: Amount precision 2 not working - value 3.123 got added
const newTransactionSchema = Joi.object({
    date: Joi.date().required(),
    name: Joi.string().min(3).max(20).required(),
    description: Joi.string().min(1).max(60).required(),
    amount: Joi.number().positive().precision(2).required(),
    category: Joi.string().pattern(new RegExp('[0-9a-fA-F]{24}')).required()
})

const checkedTransactionsSchema = Joi.array().items(
        Joi.string().pattern(new RegExp('[0-9a-fA-F]{24}'))
    ).required()

module.exports = {
    newTransactionSchema,
    checkedTransactionsSchema
}
