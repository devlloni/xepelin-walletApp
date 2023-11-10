import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource } from "typeorm";

import { Transactions } from './dto/transactions.entity';
import { Accounts } from "src/accounts/dto/accounts.entity";
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { transactionsConstants as t } from './helpers/constants';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transactions)
        private transactionsRepository: Repository<Transactions>,
        private dataSource: DataSource
    ) { }

    async create(createTransactionDto: CreateTransactionDto): Promise<Transactions> {
        const { from, to, amount, transactionType } = createTransactionDto;

        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            if (transactionType === t.types.retiro) {
                await this.updateBalance(queryRunner, -amount, from);
            }
            if (transactionType === t.types.deposito && from === 0) {
                console.log('INGRESA X 2DO IF');
                await queryRunner.manager
                    .createQueryBuilder()
                    .update(Accounts)
                    .set({ balance: () => `balance + ${amount}` })
                    .where('accountNumber = :accountNumber', { accountNumber: to })
                    .execute();
            }
            if (transactionType === t.types.deposito && to && (from !== 0)) {
                console.log('INGRESA X 3ER IF')
                const accountFromExists = await queryRunner.manager.createQueryBuilder()
                    .select('1')
                    .from(Accounts, 'account')
                    .where('account.accountNumber = :from', { from })
                    .getCount() > 0;
                const accountToExists = await queryRunner.manager.createQueryBuilder()
                    .select('1')
                    .from(Accounts, 'account')
                    .where('account.accountNumber = :to', { to })
                    .getCount() > 0;

                if (accountFromExists && accountToExists) {
                    await queryRunner.manager
                        .createQueryBuilder()
                        .update(Accounts)
                        .set({
                            balance: () => `CASE
                        WHEN accountNumber = ${from} THEN balance - ${amount}
                        WHEN accountNumber = ${to} THEN balance + ${amount}
                        ELSE balance
                        END`,
                        })
                        .where('accountNumber IN (:from, :to)', { from, to })
                        .execute();
                }
                else {
                    throw new HttpException('Una o ambas cuentas no existen, no se pudo realizar la transacción', HttpStatus.BAD_REQUEST);
                }
            }

            const currentDate = new Date();
            const newTransaction = this.transactionsRepository.create({
                ...createTransactionDto,
                date: currentDate,
            });

            await queryRunner.manager.save(newTransaction);
            await queryRunner.commitTransaction();

            return newTransaction;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new HttpException('Error al realizar la transacción', HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            await queryRunner.release();
        }
    }

    getTransactions(): string {
        return "Prueba de transactions"
    }


    private async updateBalance(
        queryRunner: any,
        amount: number,
        accountNumber: number,
    ) {
        await queryRunner.manager
            .createQueryBuilder()
            .update(Accounts)
            .set({ balance: () => `balance + ${amount}` })
            .where('accountNumber = :accountNumber', { accountNumber })
            .execute();
    }
}