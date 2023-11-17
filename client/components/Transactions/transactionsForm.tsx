import React, { useState } from 'react';
const TransactionsForm = ({ accountNumber, transfer } : { accountNumber: number; transfer: Function }) => {
    
    const [ accountNumberForm, setAccountNumberForm ] = useState('');
    const [ amount, setAmount ] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (accountNumber.toString() === accountNumberForm || accountNumberForm.length < 0 || accountNumberForm.length === 0) {
          alert('El CBU debe ser válido: no puede ser tu mismo número de cuenta.');
        } else if (Number(amount) === 0 || amount.length < 0 || Number(amount) < 0) {
          alert('El monto debe ser válido, no puede ser igual o menor a 0.');
        } else {
          transfer(accountNumber, parseInt(accountNumberForm), parseInt(amount));
        }   
    }

    return(
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-lg mb-4 font-semibold text-gray-700">Transferir fondos</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="accountNumber">
              Número de cuenta (CBU)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="accountNumber"
              type="text"
              placeholder="Nro. Cuenta"
              value={accountNumberForm}
              onChange={(e) => setAccountNumberForm(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
              Cantidad
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="amount"
              type="number"
              placeholder="Cantidad $"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Transferir
            </button>
          </div>
        </form>
      </div>
    )
}

export default TransactionsForm;
