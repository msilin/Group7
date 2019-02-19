import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./item.entity";
import { Order } from "./order.entity";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ default: 0})
  public quantity!: number;

  @Column({ default: false})
  public isPickup!: boolean;

  @Column()
  public shippingAddress!: string;

  @Column()
  public trackingNumber!: number;

  @OneToOne((type) => Item, {cascade: false})
  @JoinColumn()
  public item!: Item;

  @OneToOne((type) => Order)
  @JoinColumn()
  public order!: Order;
}
