import React from 'react';
import { render, screen } from '@testing-library/react';
import RootLayout from '@/app/layout';

jest.mock('next-auth/react', () => ({
    useSession: () => ({
        data: { user: {name: "Usuario prueba", email: "test@example.com"}},
        status: 'authenticated'
    }),
    signIn: jest.fn(),
    signOut: jest.fn(),
}))

jest.mock('../../context/providers', () => ({
    Providers: ({ children } : { children: any }) => <div>Providers{children}</div>,
}));

describe('Root Layout', () => {
    it('Renderiza los children & components del layout correctamente', () => {
        render(
            <RootLayout>
                <div>Contenido de prueba</div>
            </RootLayout>
        );

        expect(screen.getByText('Contenido de prueba')).toBeInTheDocument();
        // expect(screen.getByText('Providers')).toBeInTheDocument();
        // expect(screen.getByText('NavBar')).toBeInTheDocument();
        // expect(screen.getByText('ToastContainer')).toBeInTheDocument();
        // expect(screen.getByText('Contenido de prueba')).toBeInTheDocument();
        
    })
});