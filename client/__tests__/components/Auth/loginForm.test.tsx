import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import LoginFormComponent from '@/components/Auth/loginForm';

//next-auth & next/router mock.
jest.mock('next-auth/react');
jest.mock('next/router', () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(),
        route: '/',
        pathname: '/',
        query: {},
        asPath: '/',
    }))
}));

describe('LoginFormComponent & Logic', () => {
    const pushMock = jest.fn();
    const mockUseSession = useSession as jest.Mock;

    beforeEach(() => {
        (useRouter as jest.Mock).mockImplementation(() => ({
            push: pushMock
        }));
        pushMock.mockClear();
        mockUseSession.mockClear();
        jest.clearAllMocks();
    })

    it('Redirecciona automaticamente si el usuario ya está autenticado', () => {
        mockUseSession.mockReturnValue({
            data: {
                user: {
                    name: 'Test user',
                },
            },
            status: 'authenticated',
        });
        render(<LoginFormComponent />);
        expect(pushMock).toHaveBeenCalledWith('/dashboard');
    });

    it('No redirecciona mientras está en estado loading.', () => {
        mockUseSession.mockReturnValue({
            data: null,
            status: 'loading',
        });
        render(<LoginFormComponent />);
        expect(pushMock).not.toHaveBeenCalled();
    })

    it('redirecciona a /dashboard cuando el usuario se autentica', async () => {
        (signIn as jest.Mock).mockResolvedValue({ error: null });
        const { getByLabelText, getByRole } = render(<LoginFormComponent />);

        fireEvent.change(getByLabelText(/correo electrónico/i), { target: { value: 'test@example.com' }});
        fireEvent.change(getByLabelText(/contraseña/i), { target: { value: 'password' } });

        // Disparar evento login por button/submit.

        fireEvent.submit(getByRole('button', { name: /ingresar/i }));

        await waitFor(() => expect(pushMock).toHaveBeenCalledWith('/dashboard'));
    });

    it('Redirecciona después de que la sesión cambia a autenticada', async () => {
        mockUseSession.mockReturnValue({
            data: null,
            status: 'loading'
        });

        render(<LoginFormComponent />);

        mockUseSession.mockReturnValue({
            data: {
                user: {
                    name: 'Test user',
                },
            },
            status: 'authenticated'
        });

        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith('/dashboard');
        })
    });

    it('muestra un error cuando signIn falla', async () => {
        (signIn as jest.Mock).mockResolvedValue({ error: 'ERROR!' });
    
        global.alert = jest.fn();
    
        const { getByLabelText, getByRole } = render(<LoginFormComponent />);

        fireEvent.change(getByLabelText(/correo electrónico/i), { target: { value: 'test@example.com' } });
        fireEvent.change(getByLabelText(/contraseña/i), { target: { value: 'password' } });
        fireEvent.submit(getByRole('button', { name: /ingresar/i }));
    
        await waitFor(() => expect(global.alert).toHaveBeenCalledWith('ERROR!'));
      });
});
