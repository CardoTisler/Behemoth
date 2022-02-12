import {Transaction} from "../../@types/TransactionTypes/Transaction";
import {handleResponse} from "./common";
/**
 * Tells the API to bundle current stored Transactions to CSV format and send it to the client.
 * Client waits for the data and then downloads it as a .csv file.
 */
export const handleCsvExport = async (): Promise<void> => {
    return await fetch("transactions/export", {
        method: "POST",
        mode: "cors",
        headers: {
            "x-access-token": localStorage.getItem("token") as string,
        },
    }).then(async (res: Response) => {
        const blob = await res.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "exported_" + new Date().toISOString().split("T")[0] + ".csv";
        link.click();
        setTimeout(() => URL.revokeObjectURL(link.href), 0);
    });
};

interface IDeleteTransaction {
    allTransactions: Transaction[];
    statusText: string;
}

/**
 * Delete all Transactions that correspond to the _id values in checkedTransactions array
 * @param checkedTransactions Array of Transaction _id's
 * @param dispatch Dispatch function to display success/error tooltips
 */
export const handleTransactionsDelete = async (checkedTransactions: string[]): Promise<IDeleteTransaction> => {
    return await fetch("transactions/delete", {
        body: JSON.stringify(checkedTransactions),
        method: "DELETE",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token") as string,
        },
    }).then(handleResponse)
        .then((res: any) => res)
        .catch((err: Error) => {
            throw new Error(err.message);
        });
};

export const addTransactionToDatabase = async (newTransaction: any) => {
    return await fetch("/transactions/new", {
        body: JSON.stringify(newTransaction),
        headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token") as string,
        },
        method: "POST",
        mode: "cors",
    }).then(handleResponse)
        .then((res: any) => res)
        .catch((err: Error) => {
            throw new Error(err.message);
        });
};

/**
 * Find the transaction.name value based on transactionId, then find all transactions
 * that have the same name value and update their transaction.category field to reference
 * the new category Id.
 * @param newCategoryId The _id value of the category that is applied to Transaction
 * @param transactionId The _id of Transaction that was modified.
 */
export const handleCategoryUpdate = async (newCategoryId: string, transactionId: string) => {
    const url = "/transactions/update/".concat(transactionId);
    return await fetch(url, {
        method: "PUT",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token") as string,
        },
        body: JSON.stringify({newCategoryId}),
    }).then(handleResponse)
        .then((res: any) => res)
        .catch((err: Error) => {
            throw new Error(err.message);
        });
};

/**
 * Update Transactions that have same categories assigned to them.
 * @param newCategoryId
 * @param oldCategoryId
 */
export const updateTransactionCategories = async (newCategoryId: string, oldCategoryId: string) => {
    await fetch("/transactions/updatecategories/".concat(oldCategoryId), {
        method: "PUT",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token") as string,
        },
        body: JSON.stringify({newCategoryId}),
    }).then(handleResponse)
        .then((res: any) => res)
        .catch((err: Error) => {
            throw new Error(err.message);
        });
};
