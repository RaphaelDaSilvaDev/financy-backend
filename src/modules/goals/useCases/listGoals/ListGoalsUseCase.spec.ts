import { IGoalsRepository } from "@modules/goals/repositories/IGoalsRepository";
import { GoalsRepositoryInMemory } from "@modules/goals/repositories/in-memory/GoalRepositoryInMemory";
import { CreateGoalUseCase } from "../createGoal/CreateGoalUseCase";
import { ListGoalsUseCase } from "./ListGoalsUseCase";

let createGoalUseCase: CreateGoalUseCase;
let listGoalsUseCase: ListGoalsUseCase;
let goalRepository: IGoalsRepository;

describe("List All Goals per User", () => {
  beforeEach(() => {
    goalRepository = new GoalsRepositoryInMemory();
    createGoalUseCase = new CreateGoalUseCase(goalRepository);
    listGoalsUseCase = new ListGoalsUseCase(goalRepository);
  });

  it("should be able to list all goal", async () => {
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
      income_value: 90,
      name: "Test Goal 2",
      user_id: "user_id",
    });

    const response = await listGoalsUseCase.execute("user_id");

    console.log(response);

    expect(response.length).toBe(2);
  });
});
