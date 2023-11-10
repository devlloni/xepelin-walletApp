import { IsNotEmpty, IsNumber, IsString, isNotEmpty, isNumber } from "class-validator";

export class CreateTransactionDto { 
    @IsNotEmpty()
    @IsNumber()
    readonly from: number;

    @IsNotEmpty()
    @IsNumber()
    readonly to: number;

    @IsNotEmpty()
    @IsNumber()
    readonly amount: number;

    @IsString()
    @IsNotEmpty()
    readonly transactionType: string;
}
