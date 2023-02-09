import { Goal } from "@modules/goals/infra/entities/Goal";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { Entry } from "./Entry";

import { v4 as uuidV4 } from "uuid";

@Entity("entry_goals")
export class EntryGoals {
  @PrimaryColumn()
  id: string;

  @Column()
  value: number;

  @OneToOne(() => Entry)
  @JoinColumn({ name: "entry_id" })
  @Column()
  entry_id: string;

  @OneToOne(() => Goal)
  @JoinTable({ name: "goal_id" })
  @Column()
  goal_id: string;

  @OneToOne(() => Goal)
  @JoinTable({
    name: "goals",
    joinColumns: [{ name: "income_type" }],
    inverseJoinColumns: [{ name: "goal" }],
  })
  goal: Goal;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
