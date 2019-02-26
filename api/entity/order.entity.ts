import { Column, Entity, Index, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { OrderItem } from "./order_item.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public shippingAddress!: string;

    @Column()
    public trackingNumber!: number;

    @Column()
    public date!: Date;

    @OneToMany((type) => OrderItem, (item) => item.order)
    public items!: OrderItem[];
}
