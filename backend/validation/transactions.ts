export const validateNameField = (nameInput: string): boolean => {
    if (nameInput.length > 60 || nameInput.length === 0) { return false; }
    return true;
};

export const validateDate = (dateInput: string): boolean => {
    try {
        new Date(dateInput).toISOString();
    } catch (err: any) {
        return false;
    }
    return true;
};

export const validateDescription = (desc: string): boolean => {
    if (desc.length > 60 || desc.length === 0) { return false; }
    return true;
};

export const validateAmount = (amountInput: string): boolean => {
    let amount;
    try {
        if (amountInput.split(".")[1].length > 2) { return false; }
        amount = Number(amountInput);
    } catch (err: any) {
        return false;
    }
    if (amount < 0) { return false; }
    return true;
};

/**
 * Ensures the entered category ID matches the format required by MongoDB
 */
export const validateCategoryId = (id: string): boolean => {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return false;
    }
    return true;
}
