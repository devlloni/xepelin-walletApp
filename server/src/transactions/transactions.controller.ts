import { Body, Controller, Get, Post, ValidationPipe, Param } from "@nestjs/common";
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { Transactions } from "./dto/transactions.entity";

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Post()
    create(@Body(new ValidationPipe()) createTransactionDto: CreateTransactionDto): Promise<Transactions> {
        return this.transactionsService.create(createTransactionDto);
    }

    @Get()
    getTransactions(): Promise<Transactions[]> {
        return this.transactionsService.findAll();
    }

    @Get(':accountNumber')
    getTransactionsByAccount(@Param('accountNumber') accountNumber: number): Promise<Transactions[]> {
        return this.transactionsService.findByAccountNumber(accountNumber);
    }

    @Get('from/:fromAccount')
    getTransactionsByFrom(@Param('fromAccount') fromAccount: number): Promise<Transactions[]> {
        return this.transactionsService.findByFrom(fromAccount);
    }

    @Get('to/:toAccount')
    getTransactionsByTo(@Param('toAccount') toAccount: number): Promise<Transactions[]> {
        return
    }
}