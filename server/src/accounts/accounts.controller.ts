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
    getAccountsSingle(@Param('id') id: number): string { 
        return this.accountsService.getAccounts()
    }

    @Get('account/:number')
    getAccountByNumber(@Param('number') number: number): Promise<Accounts> {
        return this.accountsService.findOneByNumber(number)
    }
    

    @Post()
    create(@Body(new ValidationPipe()) createAccountDto: CreateAccountDto): Promise<Accounts> {
        return this.accountsService.create(createAccountDto);
    }

    // @Post()
    // create(@Body(new ValidationPipe()) )
}
