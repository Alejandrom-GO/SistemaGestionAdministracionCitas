import {Entity, PrimaryGeneratedColumn, Column, ManyToOne,CreateDateColumn, UpdateDateColumn } from "typeorm";
import { MinLength, IsNotEmpty, IsNumber } from 'class-validator';
import {Users} from "./User";

@Entity()
export class Dates {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    asunto: string;

    @Column()
    @IsNotEmpty()
    descripcion: string;

    @Column()
    @IsNotEmpty()
    forario: string;

    @Column()
    @IsNotEmpty()
    fecha: Date;

    @Column()
    @IsNotEmpty()
    area: string;

    @Column()
    @IsNotEmpty()
    estado: string;

    @ManyToOne(() => Users, user => user.dates)
    @IsNotEmpty()
    user: Users;

    
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

}