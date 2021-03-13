import { OneToMany, Entity, PrimaryGeneratedColumn,ManyToOne, Unique, Column , CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { MinLength, IsNotEmpty, IsNumber } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import {Dates} from './Dates';
import { TypesUser } from './typesUsers';
@Entity()
@Unique(['username'])
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  area: string;

  @Column()
  @IsNotEmpty()
  name: string;
  
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
  
  @ManyToOne(() => TypesUser, typeUser => typeUser.typesU)
  @IsNotEmpty()
  typeUser: Users;

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
