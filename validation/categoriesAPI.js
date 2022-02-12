const Joi = require('joi');

const newCategorySchema = Joi.object({
    name: Joi.string().alphanum().min(1).max(30).required(),
    budget: Joi.number().positive().precision(2).required(),
    type: Joi.string().case("upper").valid("INCOME", "EXPENSE", "NONE").required()
})

const itemIdSchema = Joi.object({
    id: Joi.string().pattern(new RegExp('[0-9a-fA-F]{24}')).required()
})

module.exports = {
    newCategorySchema,
    itemIdSchema
}
