import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transactions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    from: number;

    @Column()
    to: number;

    @Column()
    amount: number;

    @CreateDateColumn()
    date: Date;
}
