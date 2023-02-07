import { Goal } from "../infra/entities/Goal";
import { ICreateGoal } from "../interfaces/ICreateGoal";

export interface IGoalsRepository {
  create(data: ICreateGoal): Promise<Goal>;
  findByName(name: string, user_id: string): Promise<Goal>;
  findById(id: string, user_id: string): Promise<Goal>;
  getAllPercentagesValues(user_id: string): Promise<number>;
  getAllGoals(user_id: string): Promise<Goal[]>;
  getAllGoalsByAmount(user_id: string): Promise<Goal[]>;
  getAllGoalsByPercentage(user_id: string): Promise<Goal[]>;
  removeGoal(id: string, user_id: string): Promise<void>;
  getAvailablePercentageByUser(user_id: string): Promise<number>;
  getGoal(user_id: string, goal_id: string): Promise<Goal>;
}
