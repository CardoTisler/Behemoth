import * as yup from "yup";

export const categoryFormSchema = yup.object({
    name: yup.string().min(1).max(20).required(),
    budget: yup.number().positive().integer().required()
})

export const transactionFormSchema = yup.object({
    amount: yup.number().positive().required()
        .test(
            "Decimal",
            "Amount must be int or decimal with max precision 2",
            // (amount) => amount.match(new RegExp("\\d{1,5}|\\d{0,5}\\.\\d{1,2}"))
            (amount) => {
                const regex = new RegExp("\\d{1,5}|\\d{0,5}\\.\\d{1,2}")
                return regex.test(amount);
            }
        ),
    date: yup.date().required(),
    description: yup.string().min(1).max(60).required(),
    name: yup.string().min(1).max(40).required()
})
