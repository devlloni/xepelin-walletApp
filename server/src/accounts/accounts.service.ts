import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

import { Accounts } from "./dto/accounts.entity";
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Accounts)
        private accountsRepository: Repository<Accounts>,
    ) {}
    
    async getAccount(id: number): Promise<Accounts> {
        const account = await this.accountsRepository.findBy({id});
        if (!account || account.length < 1) {
            throw new Error('Cuenta no encontrada');
        }
        return account[0];
    }
    
    findAll(): Promise<Accounts[]> {
        return this.accountsRepository.find();
    }

    async getAccountBalance(id: number): Promise<number> {
        const account = await this.accountsRepository.findOne({
            where: { id: id },
        });
        if (!account) {
            throw new Error('Cuenta no encontrada.');
        }
        return account.balance;
    }

    async getAccountBalanceByAccount(accountNumber: number): Promise<number> {
        const account = await this.accountsRepository.findOne({
            where: { accountNumber: accountNumber },
        });
        if (!account) {
            throw new Error('Cuenta no encontrada');
        }
        return account.balance;
    }

    async remove(id: number): Promise<void> {
        await this.accountsRepository.delete(id);
    }

    async create(createAccountDto: CreateAccountDto): Promise<Accounts> {
        const existingAccount = await this.accountsRepository.findOne({
            where: [
                { email: createAccountDto.email },
                { accountNumber: createAccountDto.accountNumber },
            ]
        });
        if (existingAccount) {
            if (existingAccount.email === createAccountDto.email) {
                throw new ConflictException('El correo electrónico ya está en uso.');
            }
            if (existingAccount.accountNumber === createAccountDto.accountNumber) {
                throw new ConflictException('El número de cuenta ya está en uso.');
            }
        }
        const hashedPassword = await bcrypt.hash(createAccountDto.password, 10)
        const newAccount = this.accountsRepository.create({
            ...createAccountDto,
            password: hashedPassword,
        });
        return this.accountsRepository.save(newAccount)
    }
}
