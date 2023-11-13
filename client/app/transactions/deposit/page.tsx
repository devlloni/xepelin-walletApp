"use client"
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { API_BASE_URL } from '@/config/utils';

const DepositPage = () => {
    const { data: session, status } = useSession();
    const [amount, setAmount] = useState(0);
    const [ currentBalance, setCurrentBalance ] = useState<number|null>(null);
    const [ disabledButton, setDisabledButton ] = useState(false);
    const router = useRouter();

    const getCurrentBalance = async (accNumber: number) => {
        const resp = await axios.get(`${API_BASE_URL}/accounts/account/${accNumber}/balance`);
        if (resp.status === 200 && resp.data) {
            setCurrentBalance(resp.data);
        }
    }

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/login');
        }
        if(currentBalance === null && session?.user?.accountNumber) {
            getCurrentBalance(session?.user?.accountNumber);
        }
    }, [status, session]);

    const realiceTransfer = async () => {
        if((Number(amount) && Number(amount) > 0) && session?.user?.accountNumber) {
            const depositBody = {
                from: 0,
                to: session?.user?.accountNumber,
                amount: Number(amount),
                transactionType: 'deposit',
            };
            const resp = await axios.post(`${API_BASE_URL}/transactions`, depositBody);
            if (resp.status === 201 && resp.data) {
                console.log('Deposito realizado: ', resp.data);
                toast('¡Depósito realizado!', { hideProgressBar: false, autoClose: 2000, type: 'success' });
                if(currentBalance) {
                    setCurrentBalance(Number(currentBalance) + Number(amount));
                }
            } else {
                console.log('Hubo un error al realizar la transacciòn: ', resp);
                toast('Ocurrió un error inesperado.', {hideProgressBar: true, autoClose: 2000, type: 'error' })
            }
            setTimeout(() => {
                setDisabledButton(false);
            }, 1000);
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        realiceTransfer();
        setDisabledButton(true);
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <p className='font-medium text-sm'>Balance actual: {currentBalance ? currentBalance : 'Cargando..'}</p>
                    <form onSubmit={handleSubmit} className="space-y-6 mt-2">
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Cantidad a depositar</label>
                            <div className="mt-1">
                                <input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    value={amount}
                                    onChange={(e: any) => setAmount(e.target.value)}
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                        <div>
                            <button disabled={disabledButton} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Ingresar dinero
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DepositPage;
