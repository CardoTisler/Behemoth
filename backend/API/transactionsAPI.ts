import {Transaction as TransactionItem} from '../../frontend/@types/TransactionTypes/Transaction'
import {Request, Response } from 'express'
const express = require('express')
const router = express.Router();
const Transaction = require('../models/transaction')
const {parseFromFile, arrayToTransactions} = require('../csvParser');
const stringify = require('csv-stringify')

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

router.post('/transactions/new', async (req: Request, res: Response) => {
    const newTransaction = req.body
    Transaction.insertMany([newTransaction])
    .then(() => {
        res.status(200).send({statusText: 'Added new transaction'})
    }).catch((err: Error) => {
        res.status(400).send({statusText: 'Database error when trying to add new transaction', message: err.message})
    })
})

//multer searches for key 'csvUpload' value from FormData() created in frontend.
router.post('/transactions/addcsv', upload.single('csvUpload'), async (req: Request, res: Response) => {
    //if there is an error in uploading the file, multer will throw an error and it will be caught in server.ts
    //if the code reaches here then middleware has succeeded and we can send back OK
    let results: any = [];
    if(req.file?.filename){
        results = await parseFromFile('../csvData/', req.file?.filename)
        .catch((err: Error) => res.status(400).send({statusText: err.message}))

        if(results.length !== 0){
            const {transactions, errorMessage} = await arrayToTransactions(results);
            await Transaction.insertMany(transactions)
            .then( async () => {
                const newItems = await Transaction.find({}).populate('category')
                res.status(200).send({statusText: 'Added new items to database!', newItems, errorMessage})
            }).catch((err: Error) => {
                res.status(500).send({statusText: err.message})
            })

        }
    } else {
        res.status(404).send({statusText: `Couldn't get filename for parsing.`})
    }

})

router.post('/transactions/export', async (req: Request, res: Response) => {
    await Transaction.find({}).populate('category').then((foundItemsArray: TransactionItem[]) => {

        stringify(foundItemsArray, {
            header: true,
            columns: ['date', 'name', 'description','amount','category.name','category.type'],
            delimiter: ';'
        }, (err: any, output: string) => {
            const filename = 'exported_'+new Date().toISOString().split('T')[0]+'.csv'
            // res.set('Content-Type', 'text/csv')
            // res.setHeader('Content-disposition', 'attachment; filename='+filename)
            res.attachment(filename)
            res.set('filename', filename)
            res.status(201).send(output)
        })
    })
})

router.get('/transactions/show', async (req: Request, res: Response) => {
    await Transaction.find({}).populate('category').then((foundItemsArray: TransactionItem[]) => {
        if (foundItemsArray.length === 0) {
            res.status(400).send({statusText: 'Did not find any transactions.'})
        } else {
            res.status(200).send({transactionsList: [...foundItemsArray]})
        }
    }).catch((err: any) => {
        res.status(400).send({statusMessage: err.message });
    })
})


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
            res.status(200).send({statusText: `Transactions' update successful.`})
        }).catch((err: any) => {
            res.status(400).send({statusText: err.message})
        })
    }).catch((err: any) => {
        res.status(404).send({statusText: err.message})
    })
})

router.put('/transactions/updatecategories/:id', async(req: Request, res: Response) => {
    const oldCategoryId = req.params.id
    const { newCategoryId } = req.body
    await Transaction.updateMany({category: oldCategoryId}, {$set: {category: newCategoryId}})
    .then(() => {
        res.status(200)
    })
    .catch((err: any) => {
        res.status(400).send({statusText: err.message})
    })
})

router.delete('/transactions/delete', async (req: Request, res: Response) => {
    const {checkedTransactions} = req.body
    await Transaction.deleteMany({_id: {$in: checkedTransactions}})
        .catch((err: any) => {
            res.status(400).send({statusText: err.message})
    })
    await Transaction.find({}).then((allTransactions: TransactionItem[]) => {
        res.status(200).send({statusText: `Successfully deleted Transactions.`, allTransactions})
    }).catch((err: Error) => {
        res.status(400).send({statusText: err.message})
    })
})
module.exports = router;
