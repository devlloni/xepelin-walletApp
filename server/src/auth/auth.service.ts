import { ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

import { Accounts } from "../accounts/dto/accounts.entity";
// import { CreateAccountDto } from './dto/create-account.dto';

interface LoggedUser {
    email: string;
    name: string;
    accountNumber: number;
    balance: number;
}

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Accounts)
        private accountsRepository: Repository<Accounts>,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string): Promise<LoggedUser> {
       const user = await this.accountsRepository.findOne({
        where: {
            email: email,
        },
       });
       if (user && await bcrypt.compare(pass, user.password)) {
        const { password, ...result } = user;
        return result;
       }
       return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async createJwt(user: any): Promise<string> {
        const payload = { email: user.email, sub: user.id };
        return this.jwtService.sign(payload);
    }
}
