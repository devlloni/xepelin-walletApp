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
    
    getAccounts(): string {
        return "Lautaro Delloni - 8717837812813"
    }
    
    findAll(): Promise<Accounts[]> {
        return this.accountsRepository.find();
    }

    findOne(id: number): Promise<Accounts | null > {
        return this.accountsRepository.findOneBy({ id });
    }

    findOneByNumber(accountNumber: number): Promise<Accounts | null > {
        return this.accountsRepository.findOneBy({ accountNumber })
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
            ...CreateAccountDto,
            password: hashedPassword,
        });
        return this.accountsRepository.save(newAccount)
    }

    // async login()
}
