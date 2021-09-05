const express = require('express')
const router = express.Router();
const Transaction = require('../models/transaction')

//TODO: NEW route
//SHOW route
router.get('/transactions/show', async (req, res) => {
    await Transaction.find({}).populate('category').then( (foundItemsArray) => {
        res.json({
            transactionsList: [...foundItemsArray],
            status: 200})
    }).catch(err => {
        res.json({status: 400})
    })
})
//TODO: CREATE

//TODO: EDIT

//TODO: UPDATE

//TODO: DESTROY

module.exports = router;