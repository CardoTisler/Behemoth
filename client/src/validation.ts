import * as yup from "yup";

export const categoryFormSchema = yup.object({
    budget: yup.number().positive().integer().required(),
    name: yup.string().min(1).max(20).required(),
});

export const transactionFormSchema = yup.object({
    amount: yup.number().positive().required()
        .test(
            "Decimal",
            "Amount must be int or decimal with max precision 2",
            // @ts-ignore
            (amount: string) => {
                return /^\d+(\.\d{1,2})?$/.test(amount);
            }),
    date: yup.date().required(),
    description: yup.string().min(1).max(60).required(),
    name: yup.string().min(1).max(40).required(),
});
