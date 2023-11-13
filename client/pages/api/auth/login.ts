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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

    if(!response.ok) {
        return res.status(response.status).json({
            message: 'Error al iniciar sesión'
        });
    }

    const data = await response.json();
    res.status(200).json(data);
}