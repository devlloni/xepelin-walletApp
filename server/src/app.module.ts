import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { Accounts } from './accounts/dto/accounts.entity';
import { Transactions } from './transactions/dto/transactions.entity';
import { TransactionsMiddleware } from './middlewares/log-transactions.middleware';

@Module({
  imports: [
    AccountsModule,
    TransactionsModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307, // Cambiar, en Mac 3307, Windows 3306 
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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TransactionsMiddleware)
      .forRoutes({ path: 'transactions', method: RequestMethod.POST })
  }
}
