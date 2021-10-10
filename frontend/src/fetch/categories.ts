import {Category} from "../../@types/CategoryTypes/category";

// CategoryForm.tsx
interface ICategoryAddRes {
    status: number;
    statusText: string;
    addedItem?: Category;
}
interface IFormPayload {
    name: string;
    budget: string | number;
    isIncomeCategory: boolean;
}
interface ITextResponse {
    statusText: string;
}
export const addToDatabase = async (url: string, data: IFormPayload): Promise<ICategoryAddRes> =>
    await fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        mode: "cors",
        body: JSON.stringify(data),
    }).then((res) => {
        if (res.status === 200) {
            return res.json();
        }
        throw new Error(res.statusText);
    });

// ListRow.tsx
export const removeFromDatabase = async (url: string): Promise<ITextResponse> => {
    return await fetch(url, {
        method: "DELETE",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {

        if (res.status === 200) {
            return res;
        } else if (res.status === 404 || res.status === 400) {
            throw new Error(res.statusText);
        } else {
            throw new Error(`Couldn't read server response.`);
        }
    });
};
