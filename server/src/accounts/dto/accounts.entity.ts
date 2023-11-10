import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Accounts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    accountNumber: number;

    @Column()
    balance: number;

    @Column()
    email: string;

    @Column()
    password: string;
}
