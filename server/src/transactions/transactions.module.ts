import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Transactions } from "./dto/transactions.entity";
import { TransactionsController } from "./transactions.controller";
import { TransactionsService } from "./transactions.service";

// import 

@Module({
    imports: [
        TypeOrmModule.forFeature([Transactions])
    ],
    controllers: [TransactionsController],
    providers: [TransactionsService]
})

export class TransactionsModule {}
