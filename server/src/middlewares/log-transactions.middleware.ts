import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TransactionsMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void {
        if (req.method === 'POST' && req.path === '/transactions') {
            const { amount, transactionType } = req.body;
            if (transactionType === 'deposit' && amount > 10000) {
                console.log(`\x1b[33mSe ha realizado un depósito grande: \x1b[0m${amount}`);
            }
        }
        next();
    }
}
