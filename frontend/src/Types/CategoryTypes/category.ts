interface Category{
    type: string,
    category: string,
    budget: number,
    _id: string
}

interface Payload{
    category_id?: string,
    newCategory?: Category,
    allCategories?: State

}

interface Action {
    type: string,
    payload?: Payload
}

interface State{
    incomeCategories: Category[],
    expenseCategories: Category[],
    noneCategory: Category | null
}
export type {
    Category,
    Payload,
    Action,
    State
}