import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import "@testing-library/jest-dom"
import Home from '@/app/page';


jest.mock("next-auth/react", () => {
    const orginalModule = jest.requireActual('next-auth/react');
    const mockSession = {
        expires: new Date(Date.now() + 2 * 86400).toString(),
        user: { username: "admin" },
    };
    return {
        __esModule: true,
        ...orginalModule,
        useSession: jest.fn(() => {
            return { data: mockSession, status: 'aunthenticated' }
        })
    }
})

describe('HomePage', () => {
    it('should have a Home component', () => {
        render(<Home />) // ARRANGE
    
        const myElem = screen.getByText('Envíe dinero a sus amigos facilmente');
        
        expect(myElem).toBeInTheDocument();
    });
})