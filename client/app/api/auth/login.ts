import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import axios from 'axios';

import { API_BASE_URL } from '@/config/utils';

interface userData {
    name: string;
    email: string;
    password: string;
    accountNumber: number;
    balance: number;
}

interface credentialsUser {
    email: string,
    password: string,
}

export async function registerUser(userData: userData) {
    const response = await axios.post(`${API_BASE_URL}/accounts`, JSON.stringify(userData), {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    // Logic of register.
}


//!TODO
export async function loginUser(credentials: credentialsUser){
    const response = await axios.post(`${API_BASE_URL}/accounts/login`)
}