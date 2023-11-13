import { DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";

declare module "next-auth" {

    interface User {
        id: number;
        balance: number;
        accountNumber: number;
        name: string;
        email: string;
    }

    interface Session {
        user: {
            id: number;
            accountNumber: number;
            balance: number;
            email: string;
            name: string;
        } & DefaultSession['user'];
    }
}