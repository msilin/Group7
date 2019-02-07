import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
