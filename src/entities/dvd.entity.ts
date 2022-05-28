import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Cart } from "./cart.entity";
import { Stock } from "./stock.entity";

@Entity("dvds")
export class DVD {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  duration: string;

  @ManyToOne((type) => Cart, (cart) => cart.dvds)
  cart: Cart;


  @OneToOne((type) => Stock, {
    eager: true,
  })
  @JoinColumn()
  stock: Stock;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
