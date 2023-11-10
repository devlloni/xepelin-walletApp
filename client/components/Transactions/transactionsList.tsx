import React from 'react';

import { TransactionsListsProps } from './utils/transactions.interface';

const TransactionsList = ({ transactions } : TransactionsListsProps) => {

    const mockTransactions = [
        {
            amount: 1000,
            accountNumber: 912872812,
            date: new Date()
        },
        {
            amount: 7787,
            accountNumber: 998883110,
            date: new Date()
        },
    ]

    return (
        <>
            <div className="mt-8">
                <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-gray-800">Transaction History</h2>
                        <div className="overflow-x-auto mt-6">
                            <table className="min-w-full text-sm divide-y divide-gray-200">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-4 py-2 font-semibold text-left text-gray-600">Account Number</th>
                                        <th className="px-4 py-2 font-semibold text-left text-gray-600">Amount</th>
                                        <th className="px-4 py-2 font-semibold text-left text-gray-600">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {transactions.map((transaction, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2 text-gray-700">{transaction.accountNumber}</td>
                                            <td className="px-4 py-2 text-gray-700">{transaction.amount}</td>
                                            <td className="px-4 py-2 text-gray-700">{transaction.date.toDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransactionsList;
