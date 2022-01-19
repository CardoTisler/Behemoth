import {Request, Response} from 'express'
import {verifyJWT} from "../middleware/auth";

const express = require('express')
const router = express.Router();
const Category = require('../db/models/category')
const {validateName, validateBudget} = require("../validation/categories")

interface Category {
    _id: string,
    type: string,
    name: string,
    budget: number,
    user: string
}
// TODO: these types are duplicated, define them somewhere and import
interface AuthenticatedUser {
    id: string,
    username: string,
}
type AuthRequest = Request & {user: AuthenticatedUser}
// FIXME: Do not choose between category types via boolean
router.post('/categories/new', verifyJWT, async (req: AuthRequest, res: Response) => {
    const {isIncomeCategory, name, budget} = req.body
    const {id} = req.user;
    // TODO: Replace personal validation methods with joi package
    if(!validateName(name)){res.status(400).send({statusText: "Name validation failed."}); return;}
    if(!validateBudget(budget)){res.status(400).send({statusText: "Budget validation failed."}); return;}
    if(typeof isIncomeCategory === "undefined"){res.status(400).send({statusText: "Type of category is not defined."}); return;}

    await Category.find({name: name, user: id}).then(async (foundItemsArray: Category[]) => {
        if (foundItemsArray.length !== 0) {
            res.status(400).send({statusText: 'Will not add duplicate item to database!'})
        } else {
            if (isIncomeCategory) {
                await Category.create({name, type: 'Income', user: id})
                    .then((addedItem: Category) =>
                        res.status(200).send({addedItem, statusText: 'Item added to database.'}))
                    .catch((err: Error) =>
                        res.status(400).send({
                            statusText: "Couldn't add the item to database",
                            error: err.message
                        }));
            } else {
                await Category.create({name, budget, type: 'Expense', user: id})
                    .then((addedItem: Category) =>
                        res.status(200).send({addedItem, statusText: "Item added to database"}))
                    .catch(() => res.status(400).send({statusText: `Couldn't add the item to database.`}))
            }
        }
    }).catch((err: Error) => res.status(401).send({
        statusText: `Finding category from database failed.`,
        error: err.message
    }))
})
// TODO: This is a temporary solution, must change /categories/new to insert categories based on Type not boolean
router.post("/categories/new/noneCategory", verifyJWT, async( req: AuthRequest, res: Response) => {
    Category.insertMany([{type: "NONE", name: "NONE", user: req.user.id}])
        .then(() => res.status(200).send({statusText: `Added NONE category to user ${req.user.username}`}))
        .catch(() => res.status(401).send({statusText: `Could not add NONE category to user ${req.user.username}`}))
})

router.get('/categories/show', verifyJWT, async (req: AuthRequest, res: Response) => {
    const {id} = req.user
    const incomeCategories = await Category.find({type: 'Income', user: id})
        .catch((err: Error) => res.status(400).send({
            statusText: `Couldn't retrieve income categories.`,
            error: err.message
        }))

    const expenseCategories = await Category.find({type: 'Expense', user: id})
        .catch((err: Error) => res.status(400).send(
            {statusText: `Couldn't retrieve expense categories.`,
            error: err.message
            }))

    const noneCategory = await Category.find({type: 'NONE', user: id})
        .catch((err: Error) => res.status(400).send({
            statusText: `Couldn't retrieve NONE category.`,
            error: err.message
        }))

    res.status(200).send({
        incomeCategories,
        expenseCategories,
        noneCategory: noneCategory[0]
    })
})

router.delete('/categories/delete/:id', verifyJWT, async (req: AuthRequest, res: Response) => {
    const {id} = req.user
    await Category.find({_id: req.params.id, user: id})
        .then( async (foundItems: Category[]) => {
            if(foundItems.length !== 1){
                return res.status(401).send({
                    statusText: "Did not find exactly 1 record for deletion, aborting...",
                    error: ""
                })
            }
            await Category.deleteOne(foundItems[0])
                .then(() => res.status(200).send({statusText: "Item deleted."}))
                .catch((err: Error) => res.status(401).send({
                    statusText: "Item deletion failed",
                    error: err.message
                }))
    })
})

//this nukes the entire categories collection
// TODO: Move this to the test suite
router.delete("/categories/deleteAll", async (req: Request, res: Response) => {
    await Category.deleteMany({})
        .then(() => res
            .status(200)
            .send({statusText: "All categories deleted."}))
        .catch(() => res
            .status(400)
            .send({statusText: "Deleting all categories failed."}))
})
module.exports = router;
