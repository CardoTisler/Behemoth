import {Category} from "../../@types/CategoryTypes/category";
import {handleResponse} from "./common";
import {logger} from "../logger";

logger.defaultMeta = {service: "Fetch Categories"};
// CategoryForm.tsx
interface CategoryAddRes {
    status: number;
    statusText: string;
    addedItem: Category;
}

interface FormPayload {
    name: string;
    budget: number;
    type: string;
}

interface TextResponse {
    statusText: string;
}

export const addToDatabase = async (data: FormPayload): Promise<CategoryAddRes> => {
    logger.info(`Creating new category with data: ${data}`)
    return await fetch("/categories/new", {
        body: JSON.stringify(data),
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
}
// ListRow.tsx
export const removeFromDatabase = async (categoryId: string): Promise<TextResponse> => {
    logger.info(`Removing category with id: ${categoryId} from database.`)
    return await fetch(`categories/delete/${categoryId}`, {
        headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token") as string,
        },
        method: "DELETE",
        mode: "cors",
    }).then(handleResponse)
        .then((res: any) => res)
        .catch((err: Error) => {
            throw new Error(err.message);
        });
};

export const getData = async () => {
    logger.info(`Fetching categories from database.`)
    return await fetch("categories/show", {
        headers: {
            "x-access-token": localStorage.getItem("token") as string,
        },
    }).then(handleResponse)
        .then((res: any) => {
            return res
        })
        .catch((err: Error) => {
            throw new Error(err.message);
        });
}
