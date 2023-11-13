import { ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

import { Accounts } from "../accounts/dto/accounts.entity";
import { RegisterDto } from "./dto/register.dto";

interface LoggedUser {
    email: string;
    name: string;
    accountNumber: number;
    balance: number;
    access_token?: string;
}

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Accounts)
        private accountsRepository: Repository<Accounts>,
        private jwtService: JwtService,
    ) {}

    async signIn(email: string, pass: string): Promise<LoggedUser> {
        const user = await this.accountsRepository.findOne({
            where: {
                email: email,
            }
        });
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            const payload = { email: user.email, sub: user.id };

            return {
                ...result,
                access_token: this.jwtService.sign(payload),
            };
        } else {
            throw new ConflictException('No hay registros con esos datos.');
        }
    }

    async signUp(registerDto: RegisterDto): Promise<Omit<LoggedUser, 'password'>> {
        const { email, password, balance, accountNumber, name } = registerDto;

        const existingAccount = await this.accountsRepository.findOne({
            where: [{email, accountNumber}],
        });

        if (existingAccount) {
            throw new ConflictException('El correo electrónico o número de cuenta ya existe.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAccount = this.accountsRepository.create({
            email,
            password: hashedPassword,
            balance,
            accountNumber,
            name,
        });
        const account = this.accountsRepository.save(newAccount);
        return account;
    }
}
