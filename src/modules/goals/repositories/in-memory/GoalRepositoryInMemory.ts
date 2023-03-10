import { Goal } from "@modules/goals/infra/entities/Goal";
import { ICreateGoal } from "@modules/goals/interfaces/ICreateGoal";
import { IGoalsRepository } from "../IGoalsRepository";

export class GoalsRepositoryInMemory implements IGoalsRepository {
  goals: Goal[] = [];

  async create({
    color,
    end_by,
    end_by_value,
    income_type,
    income_value,
    name,
    user_id,
  }: ICreateGoal): Promise<Goal> {
    const goal = new Goal();

    Object.assign(goal, {
      color,
      end_by,
      end_by_value,
      income_type,
      income_value,
      name,
      user_id,
    });

    this.goals.push(goal);

    return goal;
  }

  async findByName(name: string, user_id: string): Promise<Goal> {
    return this.goals.find((goal) => goal.name === name && goal.user_id === user_id);
  }

  async getAllPercentagesValues(user_id: string): Promise<number> {
    const goals = this.goals.filter((goal) => goal.user_id === user_id);
    const result = goals.reduce((acc, value) => Number(acc) + Number(value.income_value), 0);
    return result;
  }

  async getAllGoals(user_id: string): Promise<Goal[]> {
    return this.goals.filter((goal) => goal.user_id === user_id);
  }
}
