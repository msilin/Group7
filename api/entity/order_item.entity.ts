import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
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

  @OneToOne((type) => Item, {cascade: false})
  @JoinColumn()
  public item!: Item;

  @ManyToOne((type) => Order, (order) => order.items)
  public order!: Order;
}
