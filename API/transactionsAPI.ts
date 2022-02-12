import {Transaction as TransactionItem} from '../@types/TransactionTypes/Transaction'
import { Request, Response } from 'express'
import {verifyJWT} from "../middleware/auth";
import {Category as CategoryItem} from "../@types/CategoryTypes/Category"
import {AuthRequest, FileRequest} from "../@types/Auth";
const express = require('express');
const router = express.Router();
const Transaction = require('../db/models/transaction');
const Category = require('../db/models/category');
const {parseFromFile, arrayToTransactions} = require('../csvParser');
const stringify = require('csv-stringify');
const {newTransactionSchema, checkedTransactionsSchema, transactionAmountSchema} = require("../validation/transactionsAPI");
const {itemIdSchema} = require("../validation/categoriesAPI");

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

router.post('/transactions/new', verifyJWT, async (req: AuthRequest, res: Response) => {
    try {
        await newTransactionSchema.validateAsync(req.body)
        await transactionAmountSchema.validateAsync(req.body.amount, {convert: false});
    } catch (err: any) {
        return res.status(422).send({
            statusText: "Can not add new Transaction.",
            error: err.message
        })
    }

    Transaction.insertMany([{...req.body, user: req.user.id}])
    .then((addedItems: TransactionItem[]) => {
        res.status(201).send({statusText: 'Added new transaction', addedItem: addedItems[0]})
    }).catch((err: Error) => {
        res.status(500).send({statusText: 'Database error when trying to add new transaction', error: err.message})
    })
})

//multer searches for key 'csvUpload' value from FormData() created in frontend.
router.post('/transactions/addcsv', verifyJWT, upload.single('csvUpload'), async (req: FileRequest, res: Response) => {
    //if there is an error in uploading the file, multer will throw an error and it will be caught in app.ts
    //if the code reaches here then middleware has succeeded and we can send back OK
    let results: any = [];
    if(req.file?.filename){
        results = await parseFromFile('../csvData/', req.file?.filename)
        .catch((err: Error) => res.status(500).send({statusText: `Could not parse data from file`, error: err.message}))

        if(results.length === 0) {
            return res.status(204).send({statusText: `Did not find any results from the file`})
        }
        const {transactions, errorMessage} = await arrayToTransactions(results, req.user.id);
        if(errorMessage){
            return res.status(400).send({
                statusText: "Will not add imported transactions to database.",
                error: "Amount of rows in file does not correspond with amount of Transactions. Some data was lost during parsing."
            })
        }
        // TODO: Implement https://stackoverflow.com/questions/57151028/how-to-fix-validationerror-users-validation-failed-name-path-name-is-requ/57151203
        // to Transaction and categories model handling
        await Transaction.insertMany(transactions)
            .then( async () => {
                const newItems = await Transaction.find({user: req.user.id}).populate('category')
                res.status(200).send({statusText: 'Added new items to database!', newItems})
            }).catch((err: Error) => {
                res.status(500).send({statusText: `Inserting new transactions failed`, error: err.message})
            })
        }
})

router.post('/transactions/export', verifyJWT, async (req: AuthRequest, res: Response) => {
    await Transaction.find({user: req.user.id}).populate('category').then((foundItemsArray: TransactionItem[]) => {
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
    }).catch((err: Error) => res.status(500).send({statusText: "Could not find Transactions", error: err.message}))
})
router.get('/transactions/show', verifyJWT, async (req: AuthRequest, res: Response) => {
    await Transaction.find({user: req.user.id}).populate('category').then((foundItemsArray: TransactionItem[]) => {
        res.status(200).send({transactionsList: [...foundItemsArray]})
    }).catch((err: any) => {
        res.status(500).send({statusText: `Could not find transactions.`, error: err.message});
    })
})

router.put('/transactions/update/:id', verifyJWT, async (req: AuthRequest, res: Response) => {
    const transactionId: string = req.params.id
    const {newCategoryId} = req.body
    try{
        await itemIdSchema.validateAsync(req.params);
        await itemIdSchema.validateAsync({id: newCategoryId});
    } catch (err: any) {
        return res.status(422).send({
            statusText: "Can not update Transaction(s)",
            error: err.message
        })
    }
    //find the name of the transaction that had its category changed
    await Transaction.findOne({_id: transactionId, user: req.user.id}).then( async (transaction: TransactionItem) => {
        //use the name of the transaction to find all corresponding categories and
        //change their category Id-s to the new category id
        const {name} = transaction
        await Transaction.updateMany({name, user: req.user.id}, {$set: {category: newCategoryId}})
        .then( () => {
            res.status(200).send({statusText: `Transactions' update successful.`})
        }).catch((err: any) => {
            res.status(500).send({statusText: `Could not update matching transaction(s)`, error: err.message})
        })
    }).catch((err: any) => {
        res.status(500).send({statusText: `Could not find matching transaction`, error: err.message})
    })
})
/**
 * Mainly used after deleting a category and changing the appropriate transactions'
 * categories from deleted category -> NONE category
 */
router.put('/transactions/updatecategories/:id', verifyJWT, async(req: AuthRequest, res: Response) => {
    const oldCategoryId = req.params.id
    const { newCategoryId } = req.body
    try{
        await itemIdSchema.validateAsync(req.params);
        await itemIdSchema.validateAsync({id: newCategoryId});
    } catch (err: any) {
        return res.status(422).send({
            statusText: "Can not update Transaction(s)",
            error: err.message
        })
    }
    //verify that newCategory exists in user's category list
    await Category.findOne({user: req.user.id, _id: newCategoryId})
        .then((foundItem: CategoryItem) => {
            if(!foundItem){
                return res.status(400).send({
                    statusText: `Can not update categories of transactions'`,
                    error: `New category does not exist in user's categories.`
                })
            }
        })
    await Transaction.updateMany({category: oldCategoryId, user: req.user.id}, {$set: {category: newCategoryId}})
    .then(() => {
        res.status(200).send({statusText: `Updated Transaction(s) successfully!`})
    })
    .catch((err: any) => {
        res.status(500).send({statusText: `Could not update transactions.`, error: err.message})
    })
})

router.delete('/transactions/delete', verifyJWT, async (req: AuthRequest, res: Response) => {
    const checkedTransactions = req.body;
    try {
        await checkedTransactionsSchema.validateAsync(checkedTransactions);
    } catch (err: any) {
        return res.status(422).send({
            statusText: "Can not delete chosen Transaction(s)",
            error: err.message
        })
    }
    await Transaction.deleteMany({_id: {$in: checkedTransactions}, user: req.user.id})
        .catch((err: any) => {
            res.status(500).send({statusText: `Could not delete the transactions.`, error: err.message})
    })
    await Transaction.find({user: req.user.id}).then((allTransactions: TransactionItem[]) => {
        res.status(200).send({statusText: `Successfully deleted Transactions.`, allTransactions})
    }).catch((err: Error) => {
        res.status(500).send({statusText: `Finding remaining transactions after deletion failed.`, error: err.message})
    })
})
router.delete("/transactions/delete/:id", verifyJWT, async (req: AuthRequest, res: Response) => {
    try{
        await itemIdSchema.validateAsync(req.params.id)
    } catch (err: any) {
        return res.status(422).send({
            statusText: "Can not delete chosen Transaction",
            error: err.message
        })
    }
    await Transaction.find({user: req.user.id, _id: req.params.id})
        .then((data: TransactionItem[]) => {
            if(data.length !== 1){
                return res.status(400).send({
                    statusText: `Did not find exactly one transaction with given id, found ${data.length}`,
                    error: ""
                })
            }
        })
    await Transaction.deleteOne({_id: req.params.id, user: req.user.id})
        .then(() => res.status(200).send({statusText: `Successfully deleted Transaction.`}))
        .catch((err: Error) => res.status(500).send({
            statusText: "Could not delete the Transaction",
            error: err.message
        }))
})
// TODO: Remove this once it's no longer necessary
router.delete("/transactions/deleteAll", async (req: Request, res: Response) => {
    await Transaction.deleteMany({})
        .then(() => res.status(200).send({statusText: `Successfully deleted all transactions`}))
        .catch((err: Error) => res.status(400).send({statusText: err.message}))
})
module.exports = router;
