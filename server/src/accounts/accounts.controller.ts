import { Body, Controller, Get, Post, ValidationPipe, Param } from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { CreateAccountDto } from "./dto/create-account.dto";
import { Accounts } from "./dto/accounts.entity";

@Controller('accounts')
export class AccountsController { 
    constructor(private readonly accountsService: AccountsService) {}

    @Get()
    getAccounts(): Promise<Accounts[]> {
        return this.accountsService.findAll();
    }

    @Get(':id')
    getAccountsSingle(@Param('id') id: number): Promise<Accounts> { 
        return this.accountsService.getAccount(id)
    }

    @Get(':id/balance')
    getAccountBalance(@Param('id') id : number): Promise<number> {
        return this.accountsService.getAccountBalance(id);
    }

    @Get('/account/:accountNumber/balance')
    getAccountBalanceByAccountNumber(@Param('accountNumber') accountNumber: number): Promise<number> {
        return this.accountsService.getAccountBalanceByAccount(accountNumber);
    }
    

    @Post()
    create(@Body(new ValidationPipe()) createAccountDto: CreateAccountDto): Promise<Accounts> {
        return this.accountsService.create(createAccountDto);
    }
}
