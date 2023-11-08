import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { generateUniqueAccountNumber } from '../shared/helpers';
import { Accounts } from "./dto/accounts.entity";
import { CreateAccountDto } from "./dto/create-account.dto";

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
        const newAccount = this.accountsRepository.create(createAccountDto);
        newAccount.accountNumber = generateUniqueAccountNumber();
        return this.accountsRepository.save(newAccount);
    }
}
