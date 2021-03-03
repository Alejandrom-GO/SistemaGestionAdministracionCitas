import { OneToMany, Entity, PrimaryGeneratedColumn, Unique, Column , CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { MinLength, IsNotEmpty, IsNumber } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import {Dates} from './Dates';
@Entity()
@Unique(['username'])
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  @IsNotEmpty()
  username: number;

  @Column()
  @MinLength(4)
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
  role: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToMany(() => Dates, dates => dates.user)
    dates: Date[];



  hashPassword(): void {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  checkPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
