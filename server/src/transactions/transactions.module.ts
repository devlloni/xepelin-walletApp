import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Transactions } from "./dto/transactions.entity";
import { TransactionsController } from "./transactions.controller";
import { TransactionsService } from "./transactions.service";
import { BalanceGateway } from "./helpers/balance.gateway";

// import 

@Module({
    imports: [
        TypeOrmModule.forFeature([Transactions])
    ],
    controllers: [TransactionsController],
    providers: [TransactionsService, BalanceGateway]
})

export class TransactionsModule {}
