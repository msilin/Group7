import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

export enum userType {
  "ANON",
  "EMPLOYEE",
  "ADMIN",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public firstName!: string;

  @Column()
  public lastName!: string;

  @Column()
  public password!: string;

  @Column({default: null})
  public profileUrl!: string;

  @Column()
  @Index({ unique: true })
  public emailAddress!: string;

  @Column()
  public accountType: AccountType = AccountType.EMPLOYEE;
}

export enum AccountType {
  EMPLOYEE,
  CUSTOMER,
  ADMIN,
}
