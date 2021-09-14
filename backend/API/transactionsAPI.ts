const express = require('express')
const router = express.Router();
const Transaction = require('../models/transaction')
import {Transaction as TransactionItem} from '../../frontend/@types/TransactionTypes/Transaction'
import { Request, Response } from 'express'

//TODO: NEW route
//SHOW route
console.log('trans.ts')
router.get('/transactions/show', async (req: Request, res: Response) => 
await Transaction.find({}).populate().then((foundItemsArray: TransactionItem[]) => {
    if (foundItemsArray.length === 0) {
        // res.json({ statusCode: 400, statusText: 'Did not find any transactions.' });
        res.status(400).json({statusText: 'Did not find any transactions.'})
    } else {
        // res.json({
        //     transactionsList: [...foundItemsArray],
        //     statusCode: 200
        // });
        res.status(200).json({transactionsList: [...foundItemsArray]})
    }
}).catch((err: any) => {
    console.log('err')
    res.json({ statusCode: 400, statusMessage: err.message });
}))

//TODO: CREATE

//TODO: EDIT

router.put('/transactions/update/:id', async (req: Request, res: Response) => {
    const transactionId: string = req.params.id
    const {newCategoryId} = req.body
    //find the name of the transaction that had its category changed
    return await Transaction.findOne({_id: transactionId}).then( async (transaction: TransactionItem) => {
        //use the name of the transaction to find all corresponding categories and
        //change their category Id-s to the new category id
        const name = transaction.name
        await Transaction.updateMany({name}, {$set: {category: newCategoryId}})
        .then( () => {
            // res.json({statusCode: 200})
            res.status(200)
        }).catch((err: any) => {
            // res.json({statusCode: 400, statusMessage: err.message})
            res.status(400).json({statusText: err.message})
        })
    }).catch((err: any) => {
        // res.json({statusCode: 404, statusMessage: err.message})
        res.status(404).json({statusText: err.message})
    })
})

router.put('/transactions/updatecategories/:id', async(req: Request, res: Response) => {
    const oldCategoryId = req.params.id
    const { newCategoryId } = req.body
    req
    await Transaction.updateMany({category: oldCategoryId}, {$set: {category: newCategoryId}})
    .then(() => {
        // res.json({statusCode: 200})
        // res.status(200)
    })
    .catch((err: any) => {
        res.status(400).json({statusText: err.message})
        // res.json({statusCode: 400, statusMessage: err.message})
    })
})
//TODO: DESTROY

module.exports = router;