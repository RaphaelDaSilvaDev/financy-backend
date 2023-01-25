import { User } from "@modules/users/infra/typeorm/entities/User";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("goals")
export class Goal {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  user_id: string;

  @Column()
  name: string;

  @Column()
  income_type: string;

  @Column()
  income_value: number;

  @Column()
  end_by: string;

  @Column()
  end_by_value: string;

  @Column()
  finished: string;

  @Column()
  color: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
