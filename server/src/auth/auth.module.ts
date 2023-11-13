import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AccountsModule } from "src/accounts/accounts.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { AccountsService } from "src/accounts/accounts.service";

@Module({
    imports: [
        AccountsModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'xepelinApp',
            signOptions: {
                expiresIn: '60m',
            },
        })
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
