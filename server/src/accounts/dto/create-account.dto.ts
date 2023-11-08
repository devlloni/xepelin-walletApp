import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAccountDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsNumber()
    readonly accountNumber: number;

    @IsNumber()
    readonly balance: number;

    @IsString()
    @IsNotEmpty()
    readonly email: string;
}