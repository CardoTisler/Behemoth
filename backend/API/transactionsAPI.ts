import {Transaction as TransactionItem} from '../@types/TransactionTypes/Transaction'
import { Request, Response } from 'express'
import {verifyJWT} from "../middleware/auth";
import {Category as CategoryItem} from "../@types/CategoryTypes/Category"
const express = require('express');
const router = express.Router();
const Transaction = require('../db/models/transaction');
const Category = require('../db/models/category');
const {parseFromFile, arrayToTransactions} = require('../csvParser');
const stringify = require('csv-stringify');
const { validateNameField, validateDate, validateDescription, validateAmount, validateCategoryId } = require("../validation/transactions")

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

interface AuthenticatedUser {
    id: string,
    username: string,
}
type AuthRequest = Request & {user: AuthenticatedUser}
router.post('/transactions/new', verifyJWT, async (req: AuthRequest, res: Response) => {
    let newTransaction = req.body
    const {date, name, description, amount, category} = newTransaction;
    // TODO: Replace with data validation from joi package

    if(!(validateDate(date) &&
        validateNameField(name) &&
        validateDescription(description) &&
        validateAmount(amount) &&
        validateCategoryId(category))){
        res.status(400).send({statusText: "Validation failed, will not add transaction to db."})
        return;
    }

    Transaction.insertMany({...newTransaction, user: req.user.id})
    .then(() => {
        res.status(200).send({statusText: 'Added new transaction'})
    }).catch((err: Error) => {
        res.status(400).send({statusText: 'Database error when trying to add new transaction', message: err.message})
    })
})
type FileRequest = AuthRequest & { file: any }
//multer searches for key 'csvUpload' value from FormData() created in frontend.
router.post('/transactions/addcsv', verifyJWT, upload.single('csvUpload'), async (req: FileRequest, res: Response) => {
    //if there is an error in uploading the file, multer will throw an error and it will be caught in app.ts
    //if the code reaches here then middleware has succeeded and we can send back OK
    let results: any = [];
    if(req.file?.filename){
        results = await parseFromFile('../csvData/', req.file?.filename)
        .catch((err: Error) => res.status(400).send({statusText: err.message}))

        if(results.length === 0) {
            return res.status(404).send({statusText: `Couldn't get filename for parsing.`})
        }
        const {transactions, errorMessage} = await arrayToTransactions(results, req.user.id);
        console.log(transactions);
        await Transaction.insertMany(transactions)
            .then( async () => {
                const newItems = await Transaction.find({}).populate('category')
                res.status(200).send({statusText: 'Added new items to database!', newItems, errorMessage})
            }).catch((err: Error) => {
                res.status(500).send({statusText: err.message})
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
    })
})
router.get('/transactions/show', verifyJWT, async (req: AuthRequest, res: Response) => {
    await Transaction.find({user: req.user.id}).populate('category').then((foundItemsArray: TransactionItem[]) => {
        res.status(200).send({transactionsList: [...foundItemsArray]})
    }).catch((err: any) => {
        res.status(400).send({statusMessage: err.message });
    })
})

router.put('/transactions/update/:id', verifyJWT, async (req: AuthRequest, res: Response) => {
    const transactionId: string = req.params.id
    const {newCategoryId} = req.body
    //find the name of the transaction that had its category changed
    return await Transaction.findOne({_id: transactionId, user: req.user.id}).then( async (transaction: TransactionItem) => {
        //use the name of the transaction to find all corresponding categories and
        //change their category Id-s to the new category id
        const {name} = transaction
        await Transaction.updateMany({name, user: req.user.id}, {$set: {category: newCategoryId}})
        .then( () => {
            res.status(200).send({statusText: `Transactions' update successful.`})
        }).catch((err: any) => {
            res.status(400).send({statusText: err.message})
        })
    }).catch((err: any) => {
        res.status(404).send({statusText: err.message})
    })
})
// TODO: Should probably verify that the oldCategoryId and newCategoryId are in users' categories list
/**
 * Mainly used after deleting a category and changing the appropriate transactions'
 * categories from deleted category -> NONE category
 */
router.put('/transactions/updatecategories/:id', verifyJWT, async(req: AuthRequest, res: Response) => {
    const oldCategoryId = req.params.id
    const { newCategoryId } = req.body
    //verify that newCategory exists in user's category list
    await Category.findOne({user: req.user.id, _id: newCategoryId})
        .then((foundItem: CategoryItem) => {
            if(!foundItem){
                // TODO: If this happens, should the process be aborted or continued with NONE category?
                return res.status(404).send({statusText: `New category does not exist in user's categories.`})
            }
        })
    await Transaction.updateMany({category: oldCategoryId, user: req.user.id}, {$set: {category: newCategoryId}})
    .then(() => {
        res.status(200).send({statusText: `Updated Transaction(s) successfully!`})
    })
    .catch((err: any) => {
        // FIXME: Perhaps body should be statusText: `reason for failure`, error: `technical reason for failure`
        res.status(400).send({statusText: err.message})
    })
})

router.delete('/transactions/delete', verifyJWT, async (req: AuthRequest, res: Response) => {
    const {checkedTransactions} = req.body
    await Transaction.deleteMany({_id: {$in: checkedTransactions}, user: req.user.id})
        .catch((err: any) => {
            res.status(400).send({statusText: err.message})
    })
    await Transaction.find({user: req.user.id}).then((allTransactions: TransactionItem[]) => {
        res.status(200).send({statusText: `Successfully deleted Transactions.`, allTransactions})
    }).catch((err: Error) => {
        res.status(400).send({statusText: err.message})
    })
})
router.delete("/transactions/delete/:id", verifyJWT, async (req: AuthRequest, res: Response) => {
    await Transaction.find({user: req.user.id, _id: req.params.id})
        .then((data: TransactionItem[]) => {
            if(data.length !== 1){
                return res.status(400).send({
                    statusText: `Did not find exactly one transaction with given id, found ${data.length}`
                })
            }
        })
    await Transaction.deleteOne({_id: req.params.id, user: req.user.id})
        .then(() => res.status(200).send({statusText: `Successfully deleted Transaction.`}))
        .catch((err: Error) => res.status(400).send({statusText: err.message}))
})
// TODO: Move this request to test suite because having it here doesnt seem very secure
router.delete("/transactions/deleteAll", async (req: Request, res: Response) => {
    await Transaction.deleteMany({})
        .then(() => res.status(200).send({statusText: `Successfully deleted all transactions`}))
        .catch((err: Error) => res.status(400).send({statusText: err.message}))
})
module.exports = router;
