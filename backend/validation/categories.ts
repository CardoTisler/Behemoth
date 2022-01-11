export const validateName = (name: string): boolean => {
    if(name.length === 0 || name.length > 20){ return false; }
    return true;
}

export const validateType = (type: string): boolean => {
    if(type !== "Income" && type !== "Expense" && type !== "NONE"){
        return false;
    }
    return true;
}

export const validateBudget = (budget: number | string): boolean => {
    if(typeof budget === "string"){
        try{
            budget = parseFloat(budget)
        } catch (err) {
            return false;
        }
    }
    if(budget <= 0) {return false;}
    return true;
}
// const validators = {validateName, validateType}
// export default validators;
