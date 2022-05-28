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
import { DVD } from "./dvd.entity";

@Entity()
export class Stock {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column("integer")
  quantity: number;

  @Column("numeric")
  price: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
