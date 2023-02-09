import { User } from "@modules/users/infra/entities/User";

export interface GraphEntry {
  id: string;
  income: number;
  outcome: number;
  user?: User;
  user_id: string;
  type?: string;
  created_at: Date;
}
