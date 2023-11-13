"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import useSocket from '@/hooks/useSocket';
import TransactionsForm from '@/components/Transactions/transactionsForm';
import TransactionsList from '@/components/Transactions/transactionsList';
import { API_BASE_URL, SOCKET_BASE_URL } from '@/config/utils';

const Transactions = () => {
    const { data: session, status } = useSession();
    const socket = useSocket(SOCKET_BASE_URL);
    const router = useRouter();
    const [ isLoadingSession, setIsLoadingSession ] = useState(status === 'loading');
    const [ transactionsList, setTransactionsList ] = useState<any>(null);
    const [ currentBalance, setCurrentBalance ] = useState<any>(null);

    useEffect(() => {
        if (socket && session?.user?.accountNumber && status === 'authenticated') {
            socket.emit('joinRoom', `account-${accountNumber}`);
        }
    }, [socket, session?.user?.accountNumber]);
    useEffect(() => {
        setIsLoadingSession(status === 'loading');
        if(status === 'unauthenticated') {
            router.push('/auth/login')
        }
    }, [status]);

    const getTransactionsByAccountNumber = async (accountNumber: number) => {
        const resp = await axios.get(`${API_BASE_URL}/transactions/${accountNumber}`);
        if (resp.status === 200 && resp.data){
            setTransactionsList(resp.data);
        }
    }

    const getCurrentBalance = async (accountNumber: number) => {
        const resp = await axios.get(`${API_BASE_URL}/accounts/account/${accountNumber}/balance`);
        if (resp.status === 200 && resp.data) {
            setCurrentBalance(resp.data);
        }
    }

    useEffect(() => {
        if(status === 'authenticated' && session?.user?.accountNumber && !transactionsList) {
            getTransactionsByAccountNumber(session?.user?.accountNumber);
        }
        if(status === 'authenticated' && session?.user?.id && !currentBalance) {
            getCurrentBalance(session?.user?.id);
        }
    }, [session?.user?.accountNumber, status]);

    useEffect(() => {
        if(status === 'authenticated' && session?.user?.accountNumber && currentBalance === null) {
            getCurrentBalance(session?.user?.accountNumber);
        }
    }, [session?.user?.accountNumber, currentBalance, status]);

    const accountNumber = session?.user?.accountNumber;

    const realiceTransfer = async (accFrom: number, accTo: number, amount: number) => {
            if(currentBalance < amount) {
                alert(`No tienes suficiente dinero. Te faltan ${amount - currentBalance}`);
            } else {
                if (accFrom && accTo && amount) {
                    const resp = await axios.post(`${API_BASE_URL}/transactions`, {
                        from: accFrom,
                        to: accTo,
                        amount: amount,
                        transactionType: 'deposit'
                    });
                    if (resp.status === 201 && resp.data) {
                        console.log(resp.data);
                        const newTransfer = {
                            id: resp.data.id,
                            from: resp.data.from,
                            to: resp.data.to,
                            amount: resp.data.amount,
                            date: resp.data.date,
                        }
                        setTransactionsList((list:any) => [...list, newTransfer]);
                        alert('Transferencia envíada con éxito! :D');
                    } else { 
                        alert('Hubo un error en su envío de dinero.')
                    }
                } else {
                    alert('Error en validación datos.');
                }
            }
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col lg:flex-row justify-center items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-8">

                <div className="w-full lg:w-1/2">
                    {isLoadingSession ? (<div>
                        Cargando...
                    </div>) : (
                        <>
                            <div className='text-center mb-4'>Balance actual: {currentBalance ? currentBalance : 'Cargando...'}</div>
                            <div className='text-center mb-4'>Cuenta número:
                                <i>
                                    {accountNumber ? accountNumber : 'Cargando...'}
                                </i>
                            </div>
                        </>
                    )}
                    {status !== 'loading' && session?.user?.accountNumber ? (
                        <TransactionsForm
                            transfer={realiceTransfer}
                            accountNumber={session?.user?.accountNumber}
                        />
                    ):(
                        <div>Cargando...</div>
                    )}
                </div>

                <div className="w-full lg:w-1/2">
                    {status !== 'loading' && session?.user?.accountNumber ? (
                        <TransactionsList 
                            transactions={transactionsList}
                            accountNumber={session?.user?.accountNumber}
                        />
                    ):
                    (
                        <div>
                            Cargando...
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Transactions;