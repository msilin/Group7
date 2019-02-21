import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import { Category } from "./category.entity";

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Column()
  public price: number = 0.0;

  @Column()
  public desc!: string;

  @Column()
  public imageUrl!: string;

  @Column()
  public inStore: boolean = false;

  @Column()
  public canShip: boolean = false;

  @Column()
  public stock: number = 0;

  @ManyToMany((type) => Category)
  @JoinTable()
  public categories!: Category[];
}
