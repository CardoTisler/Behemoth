declare global{
    namespace Express {
        interface Response {
            error: string,
            transactionsList: Transaction[]
        }
    }
}