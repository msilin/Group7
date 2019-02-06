import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./item.entity";
import { Order } from "./order.entity";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public quantity: number = 0;

  @Column()
  public isPickup: boolean = false;

  @Column()
  public shippingAddress!: string;

  @OneToOne((type) => Item, {cascade: false})
  @JoinColumn()
  public item!: Item;

  @OneToOne((type) => Order)
  @JoinColumn()
  public order!: Order;
}
