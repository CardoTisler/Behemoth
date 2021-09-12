interface Category{
    type: string | null,
    category: string | null,
    budget: number | null,
    _id: string | null
}

interface Payload{
    category_id: string | null,
    newCategory: Category | null,
    allCategories: categoryState | null

}

interface Action {
    type: string,
    payload: Payload
}

interface categoryState{
    incomeCategories: Category[],
    expenseCategories: Category[],
    noneCategory: Category | null
}
export type {
    Category,
    Payload,
    Action,
    categoryState
}