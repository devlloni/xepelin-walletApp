import { IsEmail, IsNotEmpty, IsString, IsNumber } from "class-validator";

export class RegisterDto { 
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    readonly name: string;
    
    @IsNumber()
    @IsNotEmpty()
    readonly accountNumber: number;

    @IsNumber()
    @IsNotEmpty()
    readonly balance: number; 
}
