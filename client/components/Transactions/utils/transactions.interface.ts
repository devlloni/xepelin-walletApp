export interface Transactions {
    accountNumber: number,
    amount: number,
    date: Date
}

export interface TransactionsListsProps {
    transactions: Transactions[],
}
