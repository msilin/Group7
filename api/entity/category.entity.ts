import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Item } from "./item.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;
}
