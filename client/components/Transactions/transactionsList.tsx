import React from 'react';
import moment from 'moment';

import { TransactionsListsProps } from './utils/transactions.interface';

const TransactionsList = ({ transactions, accountNumber }: TransactionsListsProps) => {

    const renderAccountNumber = (number: number) => {
        let accNmb = <p className=''>{number}</p>;
        if (number === accountNumber) {
            accNmb = <p>{number} ( Tu cuenta )</p>
        }
        else if (number === 0){
            accNmb = <p className='text-blue-600'>Sucursal</p>
        }
        return accNmb;
    }

    const renderAmount = (accountFrom: number, accountTo: number, amount: number) => {
        let res = <p>{`$ ${amount}`}</p>;
        if (accountFrom === accountNumber && accountTo !== accountNumber) {
            res = <p className='text-red-600'>- {`$${amount}`}</p>
        } else if (accountFrom !== accountNumber && accountTo === accountNumber) {
            res = <p className='text-green-600'>+ {`$${amount}`}</p>
        }
        return res;
    }

    return (
        <>
            <div className="mt-8">
                <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-gray-800">Historial de transacciones</h2>
                        <div className="overflow-x-auto mt-6">
                            {transactions && transactions.length > 0 ? (
                                <table className="min-w-full text-sm divide-y divide-gray-200">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="px-4 py-2 font-semibold text-left text-gray-600">Desde (CBU)</th>
                                            <th className="px-4 py-2 font-semibold text-left text-gray-600">Hacia (CBU)</th>
                                            <th className="px-4 py-2 font-semibold text-left text-gray-600">Cantidad ($)</th>
                                            <th className="px-4 py-2 font-semibold text-left text-gray-600">Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {transactions.map((transaction, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-2 text-gray-700">{renderAccountNumber(transaction.from)}</td>
                                                <td className="px-4 py-2 text-gray-700">{renderAccountNumber(transaction.to)}</td>
                                                <td className="px-4 py-2 text-gray-700">{renderAmount(transaction.from, transaction.to, transaction.amount)}</td>
                                                <td className="px-4 py-2 text-gray-700">{moment(transaction.date).format('DD/MM/YYYY')}</td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            ) : 'No parece haber transacciones disponibles...'}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransactionsList;
