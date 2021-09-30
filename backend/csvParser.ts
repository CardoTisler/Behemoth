const csv = require('csv-parse')
const fs = require('fs')
import { Transaction as TransactionItem } from "../frontend/@types/TransactionTypes/Transaction";
const Category = require('../backend/models/category')
import {Category as CategoryItem} from '../frontend/@types/CategoryTypes/category'
//const verifyDataAmount

 
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
    if(results[0][0] === 'date,name,description,amount,category.name,category.type'){
        return handleExportedCsv(results)
    }

    let transactions: TransactionItem[] = [];
    const headersIndex: Map<string, number> = mapValuesToIndex(results[0])
    //remove first entry because it contains headerinfo and last because it is a summary row
    results = results.slice(1, results.length-1)
    for (const entry of results){
        const debitOrCredit: string = entry[headersIndex.get('Deebet/Kreedit')!]
        let amount: string = debitOrCredit === 'D' ? '-' : '' //if K then its an outgoing transaction, if C then incoming
        amount = amount.concat(entry[headersIndex.get('Summa')!]).replace(',', '.');
        
        const newTransaction: TransactionItem = {
           // _id: '', //gets defined when inserted to database
            category: '', //gets defined before inserting to database but not here
            date: entry[headersIndex.get('Kuupäev')!],
            name: entry[headersIndex.get('Saaja/Maksja')!].replace(/\s+/g, ' ').trim(),
            description: entry[headersIndex.get('Selgitus')!].replace(/\s+/g, ' ').trim(),
            amount,
        }
        transactions.push(newTransaction)
    }    
    if(results.length === transactions.length){
        transactions = await addCategoriesToNewTransactions(transactions).then((transactions) => {
            return transactions;
        }).catch((err: Error) => {
            return err;
        })
        return {transactions, errorMessage: null}
    } else {
        return {transactions, errorMessage: 'Some data was lost during parsing.'}
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
        const entry = row[0].split(',')
        const transaction: TransactionItem = {
            date: entry[0],
            name: entry[1],
            description: entry[2],
            amount: entry[3],
            category: ''
        }
        if(entry[5] === 'Income'){
            for(const category of incomeCategories){
                if(category.name === entry[4]){
                    transaction.category = category._id
                    break
                }
            }
        } else if (entry[5] === 'Expense') {
            for(const category of expenseCategories){
                if(category.name === entry[4]){
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
    const requiredHeaders = ['Kuupäev', 'Saaja/Maksja', 'Selgitus', 'Summa', 'Deebet/Kreedit']
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
