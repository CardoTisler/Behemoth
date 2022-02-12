import {Request, Response} from 'express'
import {verifyJWT} from "../middleware/auth";
import {AuthRequest} from "../@types/Auth"
import {Category as CategoryItem} from "../@types/CategoryTypes/Category"
import {logger} from "../logger";
const express = require('express')
const router = express.Router();
const Category = require('../db/models/category')
const {newCategorySchema, itemIdSchema} = require("../validation/categoriesAPI");

logger.defaultMeta = {service: 'Categories API'}

router.post('/categories/new', verifyJWT, async (req: AuthRequest, res: Response) => {
    logger.info(`POST /categories/new with body: ${req.body}`);
    const {name} = req.body
    const {id} = req.user;
    try {
        await newCategorySchema.validateAsync(req.body)
    } catch (err: any) {
        logger.error(`Request body validation failed due to ${err.message}`)
        return res.status(422).send({
            statusText: "Can not add new category", error: err.message
        })
    }
    logger.info(`Attempting to find category with name: ${name}`);
    await Category.find({name: name, user: id})
        .then(async (foundItemsArray: CategoryItem[]) => {
            if (foundItemsArray.length !== 0) {
                logger.info(`Category already exists. Will not add duplicate.`);
                return res.status(400).send({
                    statusText: 'Can not add new category',
                    error: `Will not add duplicate category.`
                })
            }
            logger.info(`Creating new category: ${req.body}`)
            await Category.create({...req.body, user: id})
                .then((addedItem: CategoryItem) => {
                    res.status(200).send({addedItem, statusText: 'Item added to database.'})
                }).catch((err: Error) =>
                    res.status(400).send({
                        statusText: "Couldn't add the item to database",
                        error: err.message
                    }));
    }).catch((err: Error) => {
        logger.error(`Finding category from database failed due to ${err.message}`)
        res.status(500).send({
                statusText: `Finding category from database failed.`,
                error: err.message
            })
        })
})

router.get('/categories/show', verifyJWT, async (req: AuthRequest, res: Response) => {
    const {id} = req.user
    const incomeCategories = await Category.find({type: 'INCOME', user: id})
        .catch((err: Error) => {
            logger.error(`Could not find Income categories from database.`)
            res.status(500).send({
                statusText: `Couldn't retrieve income categories.`,
                error: err.message
            })
        })

    const expenseCategories = await Category.find({type: 'EXPENSE', user: id})
        .catch((err: Error) => {
            logger.error(`Could not find Expense categories from database.`)
            res.status(500).send({
                statusText: `Couldn't retrieve expense categories.`,
                error: err.message
            })
        })

    const noneCategory = await Category.find({type: 'NONE', user: id})
        .catch((err: Error) => {
            logger.error(`Could not find NONE category from database.`)
            res.status(500).send({
                statusText: `Couldn't retrieve NONE category.`,
                error: err.message
            })
        })
    logger.info(`Found ${incomeCategories.length} incomeCategories, ${expenseCategories.length} expenseCategories`)
    res.status(200).send({
        incomeCategories,
        expenseCategories,
        noneCategory: noneCategory[0]
    })
})

router.delete('/categories/delete/:id', verifyJWT, async (req: AuthRequest, res: Response) => {
    const {id} = req.user
    try{
        logger.info(`Validating item id: ${req.params.id}`)
        await itemIdSchema.validateAsync(req.params)
    } catch(err: any) {
        logger.error(`User id validation failed due to ${err.message}`);
        return res.status(422).send({
            statusText: "Could not delete specified category", error: err.message
        })
    }
    await Category.find({_id: req.params.id, user: id})
        .then(async (foundItems: CategoryItem[]) => {
            if (foundItems.length !== 1) {
                logger.error(`Did not find exactly one record, instead found ${foundItems.length}`);
                return res.status(400).send({
                    statusText: "Did not find exactly 1 record for deletion, aborting...",
                    error: ""
                })
            }
            const foundCategory = foundItems[0];
            logger.info(`Found category ${foundCategory}`)
            await Category.deleteOne(foundCategory)
                .then(() => {
                    logger.info(`Deleted category with name ${foundCategory.name}`);
                    res.status(200).send({statusText: "Item deleted."})
                })
                .catch((err: Error) => {
                    logger.error(`Item deletion failed due to ${err.message}`)
                    res.status(500).send({
                        statusText: "Item deletion failed",
                        error: err.message
                    })
                })
        }).catch((err: Error) => {
            logger.error(`Could not find the required category from db.`)
            res.status(500).send({statusText: "Could not find the category.", error: err.message});
        })
})

//this nukes the entire categories collection
// TODO: Remove this once it's no longer necessary
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
