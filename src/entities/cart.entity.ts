import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { DVD } from "./dvd.entity";
import { User } from "./user.entity";

@Entity("carts")
export class Cart {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ default: false })
  paid: boolean;

  @Column('float')
  total: number;

  @ManyToOne((type) => User, {
    eager: true,
  })
  @JoinColumn()
  user: User;

  @OneToOne((type) => DVD,dvd => dvd.cart, {
    eager: true,
  })
  @JoinColumn()
  dvd: DVD;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
