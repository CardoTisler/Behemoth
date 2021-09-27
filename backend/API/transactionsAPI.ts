const express = require('express')
const router = express.Router();
const Transaction = require('../models/transaction')
const {parseFromFile, arrayToTransactions} = require('../csvParser');
import {Transaction as TransactionItem} from '../../frontend/@types/TransactionTypes/Transaction'
import {Request, Response } from 'express'

interface parserPayload {
    transactions: TransactionItem[],
    error?: string | null
}

const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req: Request, file: any, cb: (ifError: null, fileSavePath: string) => void) => {
        cb(null, '../csvData')
    },
    filename: (req: Request, file: any, cb: (ifError: null, fileName: string) => void) => {
        cb(null, Date.now() +'_'+ file.originalname)
    }
})
const upload = multer({storage: storage})
//TODO: NEW route
router.post('/transactions/new', async (req: Request, res: Response) => {
    const newTransaction = req.body
    Transaction.insertMany([newTransaction])
    .then((newTransaction: TransactionItem) => {
        res.json({status: 200, statusText: 'Added new transaction.'})
    }).catch((err: Error) => {
        res.json({status: 400, statusText: 'Database error when trying to add new transaction', message: err.message})
    })
})
//SHOW route
//multer searches for key 'csvUpload' value from FormData() created in frontend. 

router.post('/transactions/addcsv', upload.single('csvUpload'), async (req: Request, res: Response) => {
    //if there is an error in uploading the file, multer will throw an error and it will be caught in server.ts
    //if the code reaches here then middleware has succeeded and we can send back OK
    let results: any = [];
    if(req.file?.filename){
        results = await parseFromFile('../csvData/', req.file?.filename)

        if(results.length !== 0){
            const {transactions, errorMessage} = await arrayToTransactions(results);
            if(errorMessage === null){
                await Transaction.insertMany(transactions).then((newItems: TransactionItem[]) => {
                    res.json({status: 200, statusText: 'Added new items to database!', newItems})
                }).catch((err: Error) => {
                    res.json({status: 400, statusText: err.message})
                })
            } else {
                res.json({status: 400, statusText: errorMessage})
            }
        }
    } else {
        res.json({status: 404, statusText: `Couldn't get filename for parsing.`})
    }
    
})


router.get('/transactions/show', async (req: Request, res: Response) => 
await Transaction.find({}).populate().then((foundItemsArray: TransactionItem[]) => {
    if (foundItemsArray.length === 0) {
        res.json({status: 400, statusText: 'Did not find any transactions.'})
    } else {
        res.json({status: 200, transactionsList: [...foundItemsArray]})
    }
}).catch((err: any) => {
    res.json({ status: 400, statusMessage: err.message });
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
            res.json({status: 200, statusText: `Transactions' update successful.`})
        }).catch((err: any) => {
            res.status(400).json({status: 400, statusText: err.message})
        })
    }).catch((err: any) => {
        res.json({status: 404, statusText: err.message})
    })
})

router.put('/transactions/updatecategories/:id', async(req: Request, res: Response) => {
    const oldCategoryId = req.params.id
    const { newCategoryId } = req.body
    req
    await Transaction.updateMany({category: oldCategoryId}, {$set: {category: newCategoryId}})
    .then(() => {
        res.json({status: 200})
    })
    .catch((err: any) => {
        res.json({status: 400, statusText: err.message})
    })
})
//TODO: DESTROY

module.exports = router;