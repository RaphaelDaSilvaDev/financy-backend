import { Goal } from "../infra/entities/Goal";
import { ICreateGoal } from "../interfaces/ICreateGoal";

export interface IGoalsRepository {
  create(data: ICreateGoal): Promise<Goal>;
  findByName(name: string, user_id: string): Promise<Goal>;
  getAllPercentagesValues(user_id: string): Promise<number>;
  getAllGoals(user_id: string): Promise<Goal[]>;
  removeGoal(id: string, user_id: string): Promise<void>;
}
