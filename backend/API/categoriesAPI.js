const express = require('express')
const router = express.Router();
const Category = require('../models/category')
const data = require('../fakeData/fakedata')
//TODO: CREATE (categoryForm should hit this URL, add the new category to db and then re-render component)
router.post('/categories/new', function(req, res){
    if(req.body.isIncomeCategory){
        console.log('is income')
        const data = {
            category: req.body.category,
            type: 'Income'
        }
        console.log(req.body)
        console.log(data)
        Category.create(data, function(err, newCategory){
            if(err){ //TODO: Add error handling - res.send(err_TYPE) to display error in UI in the future.
                console.log(err)
            } else {
                newCategory.save()
                res.redirect('/categories/show')
            }
        })
    } else {
        console.log('isnt income')
        const data = {
            category: req.body.category,
            type: 'Expense',
            budget: req.body.budget
        }
        Category.create(data, function(err, newCategory){
            if(err){
                console.log(err)
            } else {
                newCategory.save()
                res.send(newCategory)
            }
        })
    }
    //try to find existing category, if it exists, throw error because duplicate categories are not allowed
    //res.redirect('/categories')

    //if category doesnt exist, verify input data. Type MUST be either 'Income' or 'Expense'
    


    //TODO: create response data package. Includes the entire categories list for re-rendering of CategoryLists components and an integer indicating that the add was OK.
    
    // res.redirect('/categories')
})

//TODO: SHOW ROUTE, use this route to fill the state of CategoryList components

//TODO: Figure out why final console.log is being run before Category.find() finishes its job
router.get('/categories/show', async function(req, res){
    let data = {incomeList: findIncome(), expensesList: []}
    Category.find({type: 'Income'}, function(err, foundItems){
        if(err){
            console.log(err)
        } else {
            data.incomeList = [...foundItems]
        }
    }).then((element) => {console.log(element)})
    .catch(err =>{console.log(err)})
    
    console.log('end of fn')
})

const findIncome = () => {
    Category.find({type: 'Income'}, function(err, foundItems){
        if(err){
            console.log(err)
        } else {
            console.log('sending found income items')
            return [...foundItems]
            
    }})
}
//TODO: EDIT (?)

//TODO: UPDATE

//TODO: DESTROY

module.exports = router;