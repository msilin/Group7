import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Order } from "./order.entity";
import { User } from "./user.entity";

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(type => Order, { cascade: false })
  @JoinColumn()
  public order!: Order;

  @OneToOne(type => User, { cascade: false })
  @JoinColumn()
  public user!: User;

  @Column()
  public date!: Date;

  @Column()
  public type!: statusType;

  @Column({ default: true })
  public isCurrent!: boolean;
}

export enum statusType {
  InCart,
  Shipping,
  Ready,
  Cancelled
}
