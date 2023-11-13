import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { API_BASE_URL } from "@/config/utils";

export default NextAuth({
    secret: process.env.JWT_SECRET || 'xepelinApp',
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                const res = await fetch(`${API_BASE_URL}/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { 'Content-Type': 'application/json' }
                })
                const user = await res.json();

                if(res.ok && user.access_token) {
                    return {
                        ...user,
                        accountNumber: user.accountNumber,
                        balance: user.balance,
                    }
                }

                return null;
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.balance = user.balance;
                token.accountNumber = user.accountNumber;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.accountNumber = token.accountNumber as number;
            session.user.balance = token.balance as number;
            session.user.email = token.email as string;
            session.user.name = token.name as string;
            return session;
        }
    }
})