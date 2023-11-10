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

    // async create(createAccountDto: CreateAccountDto): Promise<Accounts> {
    //     const lastAccount = await this.accountsRepository
    //         .createQueryBuilder("accounts")
    //         .select("MAX(accounts.accountNumber)", "max")
    //         .getRawOne();
    
    //     let nextAccountNumber = 100000000; // CBU base de 9 dígitos
    //     if (lastAccount && lastAccount.max) {
    //         const maxAccountNumber = lastAccount && lastAccount.max 
    //         ? parseInt(lastAccount.max, 10)
    //         : 100000000; // Este es el valor base para 9 dígitos.
    //         console.log('maxNumber: ', maxAccountNumber);
    //         if (maxAccountNumber >= 100000000 && maxAccountNumber < 999999999) {
    //             nextAccountNumber = maxAccountNumber + 1;
    //         } else {
    //             throw new Error('Se ha alcanzado el número máximo de cuenta.');
    //         }
    //     }
    
    //     const newAccount = this.accountsRepository.create(createAccountDto);
    //     newAccount.accountNumber = nextAccountNumber;
    //     return this.accountsRepository.save(newAccount);
    // }

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
