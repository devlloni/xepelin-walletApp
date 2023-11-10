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

    // @Get()
    // getTransactions(): string {
    //     return this.transactionsService.getTransactions()
    // }
}