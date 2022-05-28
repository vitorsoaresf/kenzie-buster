import { compare } from "bcrypt";
import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({default: false})
  isAdmin: boolean;

  comparePwd = async (pwdString: string): Promise<boolean> => {
    return await compare(pwdString, this.password);
  };

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
