import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TransactionsForm from '@/components/Transactions/transactionsForm';

describe('TransactionsForm', () => {

    beforeAll(() => {
        window.alert = jest.fn();
    })

    it('permite la entrada de un número de cuenta y cantidad', () => {
        const mockTransfer = jest.fn();
        render(
            <TransactionsForm accountNumber={123456} transfer={mockTransfer} />
            );

        // Simular entradas de usuario
        fireEvent.change(screen.getByPlaceholderText('Nro. Cuenta'), { target: { value: '654321' } });
        fireEvent.change(screen.getByPlaceholderText('Cantidad $'), { target: { value: '100' } });

        // Simular envío del formulario
        fireEvent.click(screen.getByText('Transferir'));

        // Verificar si la función de transferencia fue llamada correctamente
        expect(mockTransfer).toHaveBeenCalledWith(123456, 654321, 100);
    });
});

