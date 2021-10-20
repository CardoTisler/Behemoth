import { Transaction as TransactionItem } from "../frontend/@types/TransactionTypes/Transaction";
import {Category as CategoryItem} from '../frontend/@types/CategoryTypes/category'
const csv = require('csv-parse')
const fs = require('fs')
const Category = require('./models/category')
//const verifyDataAmount

// TODO: Add unit tests for csvParser

export async function parseFromFile(pathToFolder: string, fileName: string): Promise<void> {
    let results: any = [];
    await new Promise<void>((resolve) => {
        fs.createReadStream(pathToFolder.concat(fileName))
        .pipe(csv({
            delimiter: ';' 
        }))
        .on('data', async (data: any) => {
            await results.push(data)
        })
        .on('end', () => {
            resolve();
        })
    }).catch((err: Error) => {
        throw new Error(err.message)
    })
    return results;
}

interface parserPayload {
    transactions: TransactionItem[],
    errorMessage: string | null
}
export async function arrayToTransactions(results: string[][]): Promise<parserPayload>{
    if(results[0][5] === 'category.type'){
        return handleExportedCsv(results)
    }
    const headersIndex: Map<string, number> = mapValuesToIndex(results[0])
    let transactions: TransactionItem[] = [];
    results = results.slice(1, results.length)
    
    for (const entry of results){
        if(entry[headersIndex.get('Reatüüp')!] === '20'){
            const debitOrCredit: string = entry[headersIndex.get('Deebet/Kreedit')!]
            let amount: string = debitOrCredit === 'D' ? '-' : '' //if K then its an outgoing transaction, if C then incoming
            amount = amount.concat(entry[headersIndex.get('Summa')!]).replace(',', '.');
            
            const newTransaction: TransactionItem | null = validateDataForTransaction(entry, headersIndex)
            if(newTransaction !== null){
                transactions.push(newTransaction)
            }
        }
        //if null then dont push to results array.
    }    

    
    transactions = await addCategoriesToNewTransactions(transactions)
    .then((transactions) => transactions )
    .catch((err: Error) => {
        return err;
    })
    if(results.length === transactions.length){
        return {transactions, errorMessage: null}
    } else {
        return {transactions, errorMessage: 'Some data was lost during parsing.'}
    }
}

const validateDataForTransaction = (array: string[], headersMap: Map<string, number>): TransactionItem | null => {
    const resultItem: TransactionItem = {date: '', category: '', name: '', description: '', amount: '' }
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

const handleExportedCsv = async (results: string[][]): Promise<parserPayload> => {
    let transactions: TransactionItem[] = []
    //remove headers
    results = results.slice(1, results.length)
    let incomeCategories: CategoryItem[] = []
    let expenseCategories: CategoryItem[] = []
    let noneCategory: CategoryItem = {type:'NONE', name:'NONE', _id:'x', budget:0}
    await Category.find({}).then((foundItemsArray: CategoryItem[]) => {
        for (const category of foundItemsArray){
            if(category.type === 'Income'){
                incomeCategories.push(category)
            } else if (category.type === 'Expense'){
                expenseCategories.push(category)
            } else {
                noneCategory._id = category._id
            }
        }
    })

    for(const row of results){
        const transaction: TransactionItem = {
            date: row[0],
            name: row[1],
            description: row[2],
            amount: row[3],
            category: ''
        }
        if(row[5] === 'Income'){
            for(const category of incomeCategories){
                if(category.name === row[4]){
                    transaction.category = category._id
                    break
                }
            }
        } else if (row[5] === 'Expense') {
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
    const errorMessage = results.length === transactions.length ? null : 'Some data was lost during parsing'
    return {transactions, errorMessage}
}
const mapValuesToIndex = (headersArray: string[]): Map<string, number> => {
    const requiredHeaders = ['Reatüüp', 'Kuupäev', 'Saaja/Maksja', 'Selgitus', 'Summa', 'Deebet/Kreedit']
    let map: Map<string, number> = new Map<string, number>();
    for (let i = 0; i < headersArray.length; i++) {
        const header = headersArray[i];
        if(requiredHeaders.includes(header)){
            map.set(header, i); //set header and its corresponding index in results array
        }   
    }
    return map;
}

const addCategoriesToNewTransactions = async (transactions: TransactionItem[]): Promise<any> => {
    //find the NONE category _id from db
    await Category.findOne({'type':"NONE"}).then((noneCategory: TransactionItem) => {
        transactions = transactions.map((newTransaction: TransactionItem) => {
            return { ...newTransaction, category: noneCategory._id! };
        });
    }).catch((err: Error) => {
        throw new Error(err.message);
    });
    return transactions;
}


