import { ICreateGoal } from "@modules/goals/interfaces/ICreateGoal";
import { IGoalsRepository } from "@modules/goals/repositories/IGoalsRepository";
import { AppError } from "@shared/errors/AppError";
import { getRepository, Repository } from "typeorm";
import { Goal } from "../entities/Goal";

export class GoalsRepository implements IGoalsRepository {
  private repository: Repository<Goal>;

  constructor() {
    this.repository = getRepository(Goal);
  }

  async create({
    id,
    finished,
    color,
    end_by,
    end_by_value,
    income_type,
    income_value,
    name,
    user_id,
  }: ICreateGoal): Promise<Goal> {
    const goal = this.repository.create({
      id,
      finished,
      color,
      end_by,
      end_by_value,
      income_type,
      income_value,
      name,
      user_id,
    });

    return await this.repository.save(goal);
  }

  async findByName(name: string, user_id: string): Promise<Goal> {
    return this.repository.findOne({ where: { user_id, name } });
  }

  async findById(id: string, user_id: string): Promise<Goal> {
    return await this.repository.findOne({ id, user_id });
  }

  async getAllPercentagesValues(user_id: string): Promise<number> {
    const goals = await this.repository.find({ where: { user_id, income_type: "percentage" } });
    const result = goals.reduce((acc, value) => Number(acc) + Number(value.income_value), 0);
    return result;
  }

  async getAllGoals(user_id: string): Promise<Goal[]> {
    return await this.repository.find({ user_id });
  }

  async removeGoal(id: string, user_id: string): Promise<void> {
    const response = await this.repository.delete({ id, user_id });
    if (response.affected === 0) {
      throw new AppError("Could not delete!");
    }
  }

  async getAvailablePercentageByUser(user_id: string): Promise<number> {
    const allPercentageGoals = await this.repository.find({
      where: { user_id, income_type: "percentage" },
    });
    const total = allPercentageGoals.reduce(
      (acc, total) => Number(acc) + Number(total.income_value),
      0
    );
    const available = 100 - total;
    return available;
  }

  async getAllGoalsByAmount(user_id: string): Promise<Goal[]> {
    return await this.repository.find({ where: { user_id: user_id, income_type: "amount" } });
  }

  async getAllGoalsByPercentage(user_id: string): Promise<Goal[]> {
    return await this.repository.find({ where: { user_id: user_id, income_type: "percentage" } });
  }

  async getGoal(user_id: string, goal_id: string): Promise<Goal> {
    return await this.repository.findOne({ user_id, id: goal_id });
  }
}
