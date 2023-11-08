import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AccountsController } from "./accounts.controller";
import { AccountsService } from "./accounts.service";
import { Accounts } from "./dto/accounts.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Accounts])
    ],
    controllers: [AccountsController],
    providers: [AccountsService]
})
export class AccountsModule {}
