interface Category{
    type: string,
    category: string,
    budget: number,
    _id: string
}

interface Payload{
    category_id: string,
    newCategory: Category,
    allCategories: categoryState

}

interface Action {
    type: string,
    payload: Payload
}

interface categoryState{
    incomeCategories: Category[],
    expenseCategories: Category[],
    noneCategory: Category
}
export type {
    Category,
    Payload,
    Action,
    categoryState
}