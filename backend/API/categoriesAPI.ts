import { Request, Response } from 'express'
const express = require('express')
const router = express.Router();
const Category = require('../models/category')

interface Category {
    _id: string,
    type: string,
    name: string,
    budget: number
}
router.post('/categories/new', async (req: Request, res: Response) => {
    const { isIncomeCategory, name, budget } = req.body
    await Category.find({ name }).then( async (foundItemsArray: Category[]) => {
        if(foundItemsArray.length !== 0){
            res.status(400).send({statusText: 'Will not add duplicate item to database!'})
        } else {
            if(isIncomeCategory){
                await Category.create({ name, type: 'Income' })
                .then((addedItem: Category) =>
                    res.status(200).send({addedItem, statusText: 'Item added to database.'}))
                .catch(() =>
                    res.status(400).send({statusText: "Couldn't add the item to database"}));
            } else {
                await Category.create({ name, budget, type: 'Expense' })
                .then( (addedItem: Category) => res.status(200).send({addedItem}))
                .catch(() => res.status(400).send({statusText: `Couldn't add the item to database.`}))
            }
        }
    }).catch(() => res.status(400).send({statusText: `Finding category from database failed.`}))
})

router.get('/categories/show', async (req: Request, res: Response) => {  
    const incomeCategories = await Category.find({type: 'Income'})
    .catch(() => res.status(400).send({statusText: `Couldn't retrieve income categories.`}))
    
    const expenseCategories = await Category.find({type: 'Expense'})
    .catch(() => res.status(400).send({statusText: `Couldn't retrieve expense categories.`}))
    
    const noneCategory = await Category.find({type: 'NONE'})
    .catch(() => res.status(400).send({statusText: `Couldn't retrieve NONE category.`}))

    res.status(200).send({
        incomeCategories,
        expenseCategories,
        noneCategory: noneCategory[0]
    })
})

router.delete('/categories/delete/:id', async (req: Request, res: Response) => {
    await Category.findByIdAndDelete({ _id: req.params.id })
    .then((dbResponse: null) => {
        if(dbResponse !== null){
            res.status(200);
        } else {
            res.status(404).send({statusText: `Didn't find anything to delete.`})}

        //if delete request succeeds, deletedItem gets returned => return status code 200 (OK)
    })
    .catch(() => {
        res.status(400).send({statusText: `Category deletion from database failed.`})})

})
module.exports = router;