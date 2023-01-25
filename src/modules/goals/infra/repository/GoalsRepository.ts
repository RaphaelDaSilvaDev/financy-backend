import { ICreateGoal } from "@modules/goals/interfaces/ICreateGoal";
import { IGoalsRepository } from "@modules/goals/repositories/IGoalsRepository";
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
      color,
      end_by,
      end_by_value,
      income_type,
      income_value,
      name,
      user_id,
    });

    this.repository.save(goal);

    return goal;
  }

  async findByName(name: string, user_id: string): Promise<Goal> {
    return this.repository.findOne({ where: { user_id, name } });
  }
}
