import {State, Action, Category} from '../../Types/CategoryTypes/category'

export const getCategories = (): Action => {
    return {
        type: 'GET_TRANSACTIONS'
    }
}

export const loadCategories = (allCategories: State): Action => {
    return {
        type: 'LOAD_CATEGORIES',
        payload: {
            allCategories: {...allCategories}
        }
    }
}

export const deleteCategory = (category_id: string): Action => {
    return {
        type: 'DELETE_CATEGORY',
        payload: {
            category_id
        }
    }
}

export const addCategory = (newCategory: Category, isIncomeCategory: boolean): Action => {
    const type = isIncomeCategory ? 'ADD_INCOME_CATEGORY' : 'ADD_EXPENSE_CATEGORY';
    return {
        type,
        payload: {
            newCategory
        }
    }
}