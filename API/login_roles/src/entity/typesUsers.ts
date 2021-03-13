import { OneToMany, Entity, PrimaryGeneratedColumn, Unique, Column , CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { MinLength, IsNotEmpty, IsNumber } from 'class-validator';
import {Users} from "./User";
@Entity()
export class TypesUser {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @IsNotEmpty()
  role: string;


  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Users, typesUser => typesUser.typeUser )
    typesU: Users[];


}
