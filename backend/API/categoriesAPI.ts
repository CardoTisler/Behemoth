const express = require('express')
const router = express.Router();
const Category = require('../models/category')
import { Request, Response } from 'express'

interface Category {
    _id: string,
    type: string,
    category: string,
    budget: number
}

router.post('/categories/new', async (req: Request, res: Response) => {
    const { isIncomeCategory, category, budget } = req.body
    await Category.find({ category }).then( async (foundItemsArray: Category[]) => {
        if(foundItemsArray.length !== 0){
            res.json({status: 400, statusText: 'Will not add duplicate item to database!'})
        } else {
            if(isIncomeCategory){
                await Category.create({ category, type: 'Income' })
                .then((addedItem: Category) => res.json({addedItem, status: 200, statusText: `Item added to database.`}) )
                .catch(() => res.json({status: 400, statusText: `Couldn't add the item to database.`}))
                
            } else {
                await Category.create({ category, budget, type: 'Expense' })
                .then( (addedItem: Category) => res.json({addedItem, status: 200}))
                .catch(() => res.json({status: 400, statusText: `Couldn't add the item to database.`}))
            }
        }
    }).catch(() => res.json({status: 400, statusText: `Finding category from database failed.`}))
})

router.get('/categories/show', async (req: Request, res: Response) => {  
    const incomeCategories = await Category.find({type: 'Income'})
    .catch(() => res.json({status: 400, statusText: `Couldn't retrieve income categories.`}))
    
    const expenseCategories = await Category.find({type: 'Expense'})
    .catch(() => res.json({status: 400, statusText: `Couldn't retrieve expense categories.`}))
    
    const noneCategory = await Category.find({type: 'NONE'})
    .catch(() => res.json({status: 400, statusText: `Couldn't retrieve NONE category.`}))
    res.json({
        incomeCategories,
        expenseCategories,
        noneCategory: noneCategory[0],
        status: 200
    })
})

//TODO: EDIT (?) (kinda difficult to implement with Material UI. Find better framework?)

//TODO: UPDATE

router.delete('/categories/delete/:id', async (req: Request, res: Response) => {
    await Category.findByIdAndDelete({ _id: req.params.id })
    .then((dbResponse: null) => {
        if(dbResponse !== null){
            res.json({status: 200})
        } else {
            res.json({status: 404, statusText: `Didn't find anything to delete.`})}

        //if delete request succeeds, deletedItem gets returned => return status code 200 (OK)
    })
    .catch(() => {
        res.json({status: 400, statusText: `Category deletion from database failed.`})})

})
module.exports = router;