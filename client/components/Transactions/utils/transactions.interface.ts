export interface Transactions {
    from: number,
    to: number,
    amount: number,
    date: Date
}

export interface TransactionsListsProps {
    transactions: Transactions[] | null,
    accountNumber: number;
}
