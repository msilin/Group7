import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { Item } from "./item.entity";

@Entity()
export class ItemCategory {
  @PrimaryGeneratedColumn()
  public id!: number;

  @OneToOne((type) => Item, {cascade: false})
  @JoinColumn()
  public item!: Item;

  @OneToOne((type) => Category)
  @JoinColumn()
  public order!: Category;
}
