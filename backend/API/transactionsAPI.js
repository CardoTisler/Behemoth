const express = require('express')
const router = express.Router();
const Transaction = require('../models/transaction')

//TODO: NEW route
//SHOW route
router.get('/transactions/show', async (req, res) => {
    await Transaction.find({}).populate().then( (foundItemsArray) => {
        if(foundItemsArray.length === 0){
            res.json({status: 400, error: 'Did not find any transactions.'})
        } else {
            res.json({
                transactionsList: [...foundItemsArray],
                status: 200})
        }
    }).catch(err => {
        console.log(err.stack)
        res.json({status: 400, error: err.message})
    })
})

//TODO: CREATE

//TODO: EDIT

router.put('/transactions/update/:id', async (req, res) => {
    const transactionId = req.params.id
    const {newCategoryId} = req.body
    //find the name of the transaction that had its category changed
    await Transaction.findOne({_id: transactionId}).then( async transaction => {
        //use the name of the transaction to find all corresponding categories and
        //change their category Id-s to the new category id
        const name = transaction.name
        await Transaction.updateMany({name}, {$set: {category: newCategoryId}})
        .then( () => {
            res.json({status: 200})
        }).catch( err => {
            res.json({status: 400, error: err.message})
        })
    }).catch(err => {
        res.json({status: 404, error: err.message})
    })
})

router.put('/transactions/updatecategories/:id', async(req, res) => {
    const oldCategoryId = req.params.id
    const { newCategoryId } = req.body
    await Transaction.updateMany({category: oldCategoryId}, {$set: {category: newCategoryId}})
    .then(() => {
        res.json({status: 200})
    })
    .catch( err => {
        res.json({status: 400, error: err.message})
    })
})
//TODO: DESTROY

module.exports = router;