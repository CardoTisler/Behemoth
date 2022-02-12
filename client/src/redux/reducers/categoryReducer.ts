import type { Action, Category, categoryState } from "../../../@types/CategoryTypes/category";

const defaultCategory: Category = {
    _id: "",
    budget: 0,
    name: "",
    type: "",
};
const initialState: categoryState = {
    expenseCategories: [],
    incomeCategories: [],
    noneCategory: defaultCategory,
};

export const categoryReducer = (state: categoryState = {...initialState}, action: Action): categoryState => {
    switch (action.type) {
        default:
            return {...state};

        case "LOAD_CATEGORIES":
            return {...state,
                ...action.payload.allCategories};

        case "GET_CATEGORIES":
            return {...state};

        case "DELETE_CATEGORY":
            return {...state,
                incomeCategories: state.incomeCategories.filter(
                    (category: Category) => category._id !== action.payload.category_id),
                expenseCategories: state.expenseCategories.filter(
                    (category: Category) => category._id !== action.payload.category_id,
                )};
        case "ADD_INCOME_CATEGORY":
            return {
                ...state,
                incomeCategories: [...state.incomeCategories, action.payload.newCategory],
            };
        case "ADD_EXPENSE_CATEGORY":
            return {
                ...state,
                expenseCategories: [...state.expenseCategories, action.payload.newCategory],
            };
    }
};

export default categoryReducer;
