"use client"
import React from 'react';

import TransactionsForm from '@/components/Transactions/transactionsForm';
import TransactionsList from '@/components/Transactions/transactionsList';

const Transactions = () => {

    const transactions = [
        { accountNumber: 912872812, amount: 123, date: new Date() },
        { accountNumber: 998883110, amount: 8874, date: new Date() },
    ]

    return (
        <div>
            <div className="container mx-auto p-6">
                <div className="flex flex-wrap -mx-3">
                    {/* Componente del formulario de transacciones */}
                    <div className="w-full lg:w-1/2 px-3 mb-6 lg:mb-0">
                        {/* Asegúrate de que tu componente de formulario esté aquí */}
                        <TransactionsForm />
                    </div>

                    {/* Lista de transacciones realizadas */}
                    <div className="w-full lg:w-1/2 px-3">
                        {/* Componente o elementos de tu lista de transacciones */}
                        <TransactionsList transactions={transactions} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Transactions;