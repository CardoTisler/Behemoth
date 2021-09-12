const express = require('express')
const router = express.Router();
const Category = require('../models/category')

router.post('/categories/new', async (req, res) => {
    const { isIncomeCategory, category, budget } = req.body
    await Category.find({ category }).then( async (foundItemsArray) => {
        if(foundItemsArray.length !== 0){
            res.json({status: 400, statusText: 'Will not add duplicate item to database!'})
        } else {
            if(isIncomeCategory){
                await Category.create({ category, type: 'Income' })
                .then( addedItem => res.json({addedItem, status: 200}) )
                .catch( err => res.json({status: 400, statusText: err.message}))
                
            } else {
                await Category.create({ category, budget, type: 'Expense' })
                .then( addedItem => res.json({addedItem, status: 200}))
                .catch( err => res.json({status: 400, statusText: err.message}))
            }
        }
    }).catch(err => res.json({status: 400, statusText: err.message}))
})

router.get('/categories/show', async (req, res) => {  
    const incomeList = await Category.find({type: 'Income'})
    .catch(err => res.json({status: 400, statusText: err.message}))
    
    const expensesList = await Category.find({type: 'Expense'})
    .catch(err => res.json({status: 400, statusText: err.message}))
    
    const noneCategory = await Category.find({type: 'NONE'})
    .catch(err => res.json({status: 400, statusText: err.message}))

    res.json({
        incomeList,
        expensesList,
        noneCategory: noneCategory[0],
        status: 200
    })
})

//TODO: EDIT (?) (kinda difficult to implement with Material UI. Find better framework?)

//TODO: UPDATE

router.delete('/categories/delete/:id', async (req, res) => {
    await Category.findByIdAndDelete({ _id: req.params.id })
    .then((dbResponse) => {
        if(dbResponse !== null){
            res.json({status: 200})
        } else {
            res.json({status: 404, statusText: `Didn't find anything to delete.`})}
    
        
        //if delete request succeeds, deletedItem gets returned => return status code 200 (OK)
    })
    .catch(err => {
        res.json({status: 400, statusText: err.message})})

})
module.exports = router;