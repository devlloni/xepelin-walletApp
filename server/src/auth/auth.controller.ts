import { Body, Controller, Get, Post, ValidationPipe, Param } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

interface LoggedUser {
    email: string;
    name: string;
    accountNumber: number;
    balance: number;
    access_token?: string;
}

@Controller('auth')
export class AuthController { 
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    signup(@Body(new ValidationPipe()) registerDto: RegisterDto): Promise<LoggedUser> {
        return this.authService.signUp(registerDto);
    }

    @Post('login')
    login(@Body(new ValidationPipe()) loginDto: LoginDto): Promise<LoggedUser> {
        return this.authService.signIn(loginDto.email, loginDto.password);
    }
}
