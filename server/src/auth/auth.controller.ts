import { Body, Controller, Get, Post, ValidationPipe, Param } from "@nestjs/common";
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController { 
    constructor(private readonly authService: AuthService) {}

   

    // @Post()
    // create(@Body(new ValidationPipe()) )
}
