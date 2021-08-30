const express = require('express')
const router = express.Router();
const Category = require('../models/category')
//const data = require('../fakeData/fakedata')
//TODO: CREATE (categoryForm should hit this URL, add the new category to db and then re-render component)
router.post('/categories/new', async function(req, res){
    const { isIncomeCategory, category, type, budget } = req.body
    await Category.find({ category }).then( async (foundItemsArray) => {

        if(foundItemsArray.length !== 0){
            console.log('Item already exists in database. Will not add duplicate!') //TODO: ERRORHANDLING: ntx. res.status(500).json({ok: false, message: 'Duplicate item found.'})
        } else {
            if(isIncomeCategory){
                await Category.create({ category, type: 'Income' })
                .then( addedItem => res.json(addedItem) )
                .catch( err => console.log(err))
                
            } else {
                await Category.create({ category, budget, type: 'Expense' })
                .then( addedItem => res.json(addedItem))
                .catch( err => console.log(err))
            }
        }
    }).catch(err => console.log(err))

    //TODO: create response data package. Includes the entire categories list for re-rendering of CategoryLists components and an integer indicating that the add was OK.
    
})

//TODO: SHOW ROUTE, use this route to fill the state of CategoryList components

//TODO: Figure out why final console.log is being run before Category.find() finishes its job
router.get('/categories/show', async function(req, res){  
    const incomeList = await Category.find({type: 'Income'})
    const expensesList = await Category.find({type: 'Expense'})
    
    res.json({
        incomeList,
        expensesList
    })
})

//TODO: EDIT (?)

//TODO: UPDATE

//TODO: DESTROY

module.exports = router;