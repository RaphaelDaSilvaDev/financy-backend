import { ICreateGoal } from "@modules/goals/interfaces/ICreateGoal";
import { GoalsRepositoryInMemory } from "@modules/goals/repositories/in-memory/GoalRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateGoalUseCase } from "./CreateGoalUseCase";

let createGoalUseCase: CreateGoalUseCase;
let goalRepositoryInMemory: GoalsRepositoryInMemory;

describe("Create a Goal", () => {
  beforeEach(() => {
    goalRepositoryInMemory = new GoalsRepositoryInMemory();
    createGoalUseCase = new CreateGoalUseCase(goalRepositoryInMemory);
  });

  it("should be able to create a new Goal", async () => {
    const goal: ICreateGoal = {
      color: "red",
      end_by: "value",
      end_by_value: "1000",
      income_type: "percentage",
      income_value: 10,
      name: "Test Goal",
      user_id: "user_id",
    };

    const createdGoal = await createGoalUseCase.execute(goal);

    expect(createdGoal).toHaveProperty("id");
  });

  it("should be not able to create a goal with same name per user", () => {
    expect(async () => {
      const goal: ICreateGoal = {
        color: "red",
        end_by: "value",
        end_by_value: "1000",
        income_type: "percentage",
        income_value: 10,
        name: "Test Goal",
        user_id: "user_id",
      };

      await createGoalUseCase.execute(goal);
      await createGoalUseCase.execute(goal);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be not able to create a goal with percentage more then 100%", () => {
    expect(async () => {
      await createGoalUseCase.execute({
        color: "red",
        end_by: "value",
        end_by_value: "1000",
        income_type: "percentage",
        income_value: 10,
        name: "Test Goal",
        user_id: "user_id",
      });

      await createGoalUseCase.execute({
        color: "red",
        end_by: "value",
        end_by_value: "1000",
        income_type: "percentage",
        income_value: 100,
        name: "Test Goal",
        user_id: "user_id",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be not able to create a goal with value equals to 0", () => {
    expect(async () => {
      await createGoalUseCase.execute({
        color: "red",
        end_by: "value",
        end_by_value: "1000",
        income_type: "percentage",
        income_value: 0,
        name: "Test Goal",
        user_id: "user_id",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
