import { Transaction as TransactionItem } from "./@types/TransactionTypes/Transaction";
import {Category as CategoryItem} from './@types/CategoryTypes/Category'
import {Map} from "mongodb";
const csv = require('csv-parse')
const fs = require('fs')
const Category = require('./db/models/category')
import {logger} from "./logger";

// TODO: Add unit tests for csvParser
export async function parseFromFile(pathToFolder: string, fileName: string): Promise<void> {
    let results: any = [];
    const pathToCSVFile = pathToFolder.concat(fileName);
    logger.info(`Creating read stream to file with path: ${pathToCSVFile}`)

    await new Promise<void>((resolve) => {
        fs.createReadStream(pathToCSVFile)
        .pipe(csv({
            delimiter: ';'
        }))
        .on('data', async (data: any) => {
            await results.push(data)
        })
        .on('end', () => {
            logger.info(`Received data from CSV file.`)
            resolve();
        })
    }).catch((err: Error) => {
        logger.error(`Could not get data from CSV file. Reason: ${err.message}`)
        throw new Error(err.message)
    })
    logger.info(`Data parsed from file: ${results}`)
    return results;
}

interface parserPayload {
    transactions: TransactionItem[],
    errorMessage: string | null
}
export async function arrayToTransactions(results: string[][], userId: string): Promise<parserPayload>{
    // if true then added csv file was previously exported from Categorizer
    if(results[0][5] === 'category.type'){
        logger.info(`Given CSV file has headers that suggest the file was previously exported from this app.`)
        return handleExportedCsv(results, userId)
    }
    const headersIndex: Map<string, number> = mapValuesToIndex(results[0])
    let transactions: TransactionItem[] = [];
    results = results.slice(1, results.length)

    for (const entry of results){
        if(entry[headersIndex.get('Reatüüp')!] === '20'){
            const debitOrCredit: string = entry[headersIndex.get('Deebet/Kreedit')!]
            let amount: string = debitOrCredit === 'D' ? '-' : '' //if K then its an outgoing transaction, if C then incoming
            amount = amount.concat(entry[headersIndex.get('Summa')!]).replace(',', '.');
            // FIXME: This validation system sucks - refactor it
            const newTransaction: TransactionItem | null = validateDataForTransaction(entry, headersIndex)
            if(newTransaction !== null){
                transactions.push({...newTransaction, user: userId})
            }
        }
        //if null then dont push to results array.
    }

    transactions = await addCategoriesToNewTransactions(transactions, userId)
    .then((transactions) => transactions )
    .catch((err: Error) => {
        return err;
    })
    logger.info(`Parsed ${transactions.length} Transactions.`)
    return {transactions, errorMessage: null}
    // TODO: This check is pointless due to CSV file having summary rows in it
    // if(results.length === transactions.length){
    //     return {transactions, errorMessage: null}
    // } else {
    //     console.log(`${results.length} and ${transactions.length}`)
    //     return {transactions, errorMessage: 'Some data was lost during parsing.'}
    // }
}

const validateDataForTransaction = (array: string[], headersMap: Map<string, number>): TransactionItem | null => {
    const resultItem: TransactionItem = {date: '', category: '', name: '', description: '', amount: '', user: ''}
    const debitOrCredit: string = array[headersMap.get('Deebet/Kreedit')!]
    let amount: string = debitOrCredit === 'D' ? '-' : '' //if K then its an outgoing transaction, if C then incoming
    amount = amount.concat(array[headersMap.get('Summa')!]).replace(',', '.');

    try{
        const [day, month, year] = array[headersMap.get('Kuupäev')!].split('.')
        resultItem.date = new Date(month.concat('.').concat(day).concat('.').concat(year)).toISOString()

        resultItem.name = array[headersMap.get('Saaja/Maksja')!].replace(/\s+/g, ' ').trim()
        resultItem.description = array[headersMap.get('Selgitus')!].replace(/\s+/g, ' ').trim()

        resultItem.amount = amount

        return resultItem
    } catch (err) {
        //if error then date was not successfully converted
        return null;
    }



}

const handleExportedCsv = async (rowsInCSVFile: string[][], userId: string): Promise<parserPayload> => {
    logger.info(`Handling exported CSV. File has ${rowsInCSVFile.length} rows.`);
    let transactions: TransactionItem[] = []
    //remove headers
    rowsInCSVFile = rowsInCSVFile.slice(1, rowsInCSVFile.length)
    let incomeCategories: CategoryItem[] = []
    let expenseCategories: CategoryItem[] = []
    let noneCategory: CategoryItem = {type:'NONE', name:'NONE', _id:'x', budget:0, user:''}
    logger.info(`Finding categories that belong to user.`)
    await Category.find({user: userId}).then((foundItemsArray: CategoryItem[]) => {
        for (const category of foundItemsArray){
            if(category.type.toUpperCase() === 'INCOME'){
                incomeCategories.push(category)
            } else if (category.type.toUpperCase() === 'EXPENSE'){
                expenseCategories.push(category)
            } else {
                noneCategory._id = category._id
            }
        }
    })
    logger.info(`Found ${incomeCategories.length} IncomeCategories and ${expenseCategories.length} ExpenseCategories`)
    logger.info(`Attempting to match existing categories with categories defined in CSV file for each transaction.`)
    for(const row of rowsInCSVFile){
        const transaction: TransactionItem = {
            date: row[0],
            name: row[1],
            description: row[2],
            amount: row[3],
            category: '',
            user: userId
        }
        if(row[5].toUpperCase() === 'INCOME'){
            for(const category of incomeCategories){
                if(category.name === row[4]){
                    transaction.category = category._id
                    break
                }
            }
        } else if (row[5].toUpperCase() === 'EXPENSE') {
            for(const category of expenseCategories){
                if(category.name === row[4]){
                    transaction.category = category._id
                    break
                }
            }
        } else {
            transaction.category = noneCategory._id
        }
        transactions.push(transaction)
    }
    const errorMessage = rowsInCSVFile.length === transactions.length ? null : 'Some data was lost during parsing'
    return {transactions, errorMessage}
}
const mapValuesToIndex = (headersArray: string[]): Map<string, number> => {
    logger.info(`Mapping column header values to their corresponding index`)
    const requiredHeaders = ['Reatüüp', 'Kuupäev', 'Saaja/Maksja', 'Selgitus', 'Summa', 'Deebet/Kreedit']
    let map: Map<string, number> = new Map<string, number>();
    for (let i = 0; i < headersArray.length; i++) {
        const header = headersArray[i];
        if(requiredHeaders.includes(header)){
            map.set(header, i); //set header and its corresponding index in results array
        }
    }
    logger.info(`Mapped values: ${map}`)
    return map;
}

const addCategoriesToNewTransactions = async (transactions: TransactionItem[], userId: string): Promise<any> => {
    logger.info(`Adding NONE category to new Transactions`);
    //find the NONE category _id from db
    await Category.findOne({'type':"NONE", user: userId}).then((noneCategory: TransactionItem) => {
        transactions = transactions.map((newTransaction: TransactionItem) => {
            return { ...newTransaction, category: noneCategory._id! };
        });
    }).catch((err: Error) => {
        throw new Error(err.message);
    });
    logger.info(`Added NONE category to ${transactions.length} Transactions.`);
    return transactions;
}


