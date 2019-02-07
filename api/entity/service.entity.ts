import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public datePosted!: Date;

  @Column()
  public title!: string;

  @Column()
  public content!: string;

  @Column()
  public imageUrl!: string;
}
