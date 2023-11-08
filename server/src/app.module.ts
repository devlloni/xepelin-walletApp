import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AccountsModule } from './accounts/accounts.module';
import { AppService } from './app.service';
import { Accounts } from './accounts/dto/accounts.entity';

@Module({
  imports: [
    AccountsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'xepelinwalletapp',
      entities: [
        Accounts,
      ],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
