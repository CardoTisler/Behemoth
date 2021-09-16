import type {categoryState, Action, Category, Payload} from '../../../@types/CategoryTypes/category'

const defaultNone: Category = {
    type: '',
    category: '',
    budget: 0,
    _id: ''
}

const defaultPayload: Payload = {
    category_id: '',
    newCategory: defaultNone,
    allCategories: {
        incomeCategories: [],
        expenseCategories: [],
        noneCategory: defaultNone
    }
}

export const getCategories = (): Action => {
    return {
        type: 'GET_CATEGORIES',
        payload: {...defaultPayload}
    }
}

export const loadCategories = (allCategories: categoryState): Action => {
    console.log(allCategories)
    return {
        type: 'LOAD_CATEGORIES',
        payload: {
            ...defaultPayload,
            allCategories: {...allCategories}
        }
    }
}

export const deleteCategory = (category_id: string): Action => {
    return {
        type: 'DELETE_CATEGORY',
        payload: {
            ...defaultPayload,
            category_id
        }
    }
}

export const addCategory = (newCategory: Category, isIncomeCategory: boolean): Action => {
    const type = isIncomeCategory ? 'ADD_INCOME_CATEGORY' : 'ADD_EXPENSE_CATEGORY';
    return {
        type,
        payload: {
            ...defaultPayload,
            newCategory
        }
    }
}