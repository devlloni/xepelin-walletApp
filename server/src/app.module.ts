import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AppService } from './app.service';
import { Accounts } from './accounts/dto/accounts.entity';
import { Transactions } from './transactions/dto/transactions.entity';

@Module({
  imports: [
    AccountsModule,
    TransactionsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'xepelinwalletapp',
      entities: [
        Accounts,
        Transactions,
      ],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
