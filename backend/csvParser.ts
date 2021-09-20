const csv = require('csv-parse')
const fs = require('fs')
import { Transaction as TransactionItem } from "../frontend/@types/TransactionTypes/Transaction";
const Category = require('../backend/models/category')
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
            text: entry[headersIndex.get('Selgitus')!].replace(/\s+/g, ' ').trim(),
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
