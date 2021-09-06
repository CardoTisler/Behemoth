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

//TODO: UPDATE - will be mass update for now since I see no point in updating only one transaction
router.put('/transactions/update/:id', async (req, res) => {
    const {name} = req.body

    // await Transaction.find({name}).then((foundItemsArray) => {
    //     foundItemsArray.forEach((item) => item.category = req.params.id.toString())
    //     res.json({status: 200}) //200 - OK
    // }).catch(err => {
    //     console.error(err)
    //     res.json({status: 400}) //400 - Bad Request
    // })
    await Transaction.updateMany({name}, {$set: {category: req.params.id}})
    .then( () => {
        res.json({status: 200}) //200 - OK
    }).catch(err => {
        console.error(err)
        res.json({status: 400}) //400 - Bad Request
    })
})

//TODO: DESTROY

module.exports = router;