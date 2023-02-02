import { IEntriesRepository } from "@modules/entries/repositories/IEntriesRepository";
import { IEntryGoalsRepository } from "@modules/entries/repositories/IEntryGoalsRepository";
import { IGoalsRepository } from "@modules/goals/repositories/IGoalsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  user_id: string;
  goal_id: string;
}

@injectable()
export class ListGoalEntriesUseCase {
  constructor(
    @inject("EntryGoalsRepository")
    private entriesGoalsRepository: IEntryGoalsRepository,
    @inject("EntriesRepository")
    private entriesRepository: IEntriesRepository,
    @inject("GoalsRepository")
    private goalRepository: IGoalsRepository
  ) {}

  async execute({ goal_id, user_id }: IRequest) {
    const entries = await this.entriesRepository.listAllEntries(user_id);
    const entriesIds = entries.map((entry) => entry.id);
    const entriesGoal = await this.entriesGoalsRepository.listGoalEntries(entriesIds, goal_id);

    /*     const goals = await this.goalRepository.getAllGoals(user_id);

    const entryGoal = await Promise.all(
      goals
        .map((goal) => {
          const entry = entriesGoal.map((entry) => {
            if (entry.goal_id === goal.id) {
              return {
                entry,
                goal,
              };
            }
          });
          return entry;
        })
        .flat(1)
    ); */

    return entriesGoal;
  }
}
