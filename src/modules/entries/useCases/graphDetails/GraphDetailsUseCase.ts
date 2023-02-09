import { addMonths, format, lastDayOfMonth, subMonths } from "date-fns";
import { IEntriesRepository } from "@modules/entries/repositories/IEntriesRepository";
import { inject, injectable } from "tsyringe";
import { Entry } from "@modules/entries/infra/entities/Entry";
import { IEntryGoalsRepository } from "@modules/entries/repositories/IEntryGoalsRepository";
import { GraphEntry } from "@modules/entries/interfaces/GraphEntry";
import { IGoalsRepository } from "@modules/goals/repositories/IGoalsRepository";

interface IRequest {
  user_id?: string;
  goal_id?: string;
}

interface GetEntriesOfMonthProps {
  month: number;
  totalValue: number;
}

@injectable()
export class GraphDetailsUseCase {
  constructor(
    @inject("EntriesRepository")
    private entriesRepository: IEntriesRepository,
    @inject("EntryGoalsRepository")
    private entryGoalRepository: IEntryGoalsRepository,
    @inject("GoalsRepository")
    private goalsRepository: IGoalsRepository
  ) {}

  async execute({ user_id, goal_id }: IRequest) {
    const today = new Date();

    const GetEntriesOfMonth = async ({ month, totalValue }: GetEntriesOfMonthProps) => {
      let monthInfo: GraphEntry[] = [];
      const thisGoal = await this.goalsRepository.findById(goal_id, user_id);

      if (!goal_id) {
        monthInfo = await this.entriesRepository.getByDate(user_id, [
          format(subMonths(today, month), "yyyy-MM-01"),
          format(subMonths(lastDayOfMonth(today), month), "yyyy-MM-dd"),
        ]);
      } else {
        const goalInfo = await this.entryGoalRepository.getGoalByDate({
          goal_id,
          date_interval: [
            format(subMonths(today, month), "yyyy-MM-01"),
            format(subMonths(lastDayOfMonth(today), month), "yyyy-MM-dd"),
          ],
        });

        const convertGoalInfo = goalInfo.map((goal) => {
          const goalInfo: GraphEntry = {
            id: goal.id,
            income: goal.value,
            outcome: 0,
            created_at: goal.created_at,
            user_id: goal.id,
            type: thisGoal.income_type,
          };
          return goalInfo;
        });

        monthInfo = convertGoalInfo;
      }

      return monthInfo.reduce(
        (acc, value) => {
          acc.total += Number(value.income) - Number(value.outcome);
          acc.thisMonth += Number(value.income) - Number(value.outcome);
          acc.date = format(subMonths(today, month), "yyyy-MM-01");
          return acc;
        },
        {
          total: totalValue,
          thisMonth: 0,
          date: format(subMonths(today, month), "yyyy-MM-01"),
          type: goal_id ? thisGoal.income_type : "percentage",
        }
      );
    };

    const entriesLast3MonthAgoResult = await GetEntriesOfMonth({ month: 36, totalValue: 0 });

    const entries3MonthAgoResult = await GetEntriesOfMonth({
      totalValue: entriesLast3MonthAgoResult.total,
      month: 3,
    });

    const entries2MonthAgoResult = await GetEntriesOfMonth({
      month: 2,
      totalValue: entries3MonthAgoResult.total,
    });

    const entriesLastMonthAgoResult = await GetEntriesOfMonth({
      month: 1,
      totalValue: entries2MonthAgoResult.total,
    });

    const entriesThisMonthAgoResult = await GetEntriesOfMonth({
      month: 0,
      totalValue: entriesLastMonthAgoResult.total,
    });

    const entryNextMonth =
      entriesLastMonthAgoResult.type === "percentage"
        ? {
            total:
              (Number(entriesLastMonthAgoResult.thisMonth) +
                Number(entriesThisMonthAgoResult.thisMonth)) /
                2 !==
              0
                ? Number(entriesThisMonthAgoResult.total) +
                  (Number(entriesLastMonthAgoResult.thisMonth) +
                    Number(entriesThisMonthAgoResult.thisMonth)) /
                    2
                : Number(entriesThisMonthAgoResult.total) +
                  Number(entriesThisMonthAgoResult.thisMonth),
            thisMonth:
              (Number(entriesLastMonthAgoResult.thisMonth) +
                Number(entriesThisMonthAgoResult.thisMonth)) /
                2 !==
              0
                ? (Number(entriesLastMonthAgoResult.thisMonth) +
                    Number(entriesThisMonthAgoResult.thisMonth)) /
                  2
                : Number(entriesThisMonthAgoResult.thisMonth),
            date: format(addMonths(today, 1), "yyyy-MM-01"),
            type: "percentage",
          }
        : {
            total:
              Number(entriesThisMonthAgoResult.total) + Number(entriesThisMonthAgoResult.thisMonth),
            thisMonth: Number(entriesThisMonthAgoResult.thisMonth),
            date: format(addMonths(today, 1), "yyyy-MM-01"),
            type: "amount",
          };

    const entry2AheadMonth =
      entryNextMonth.type === "percentage"
        ? {
            total:
              Number(entriesLastMonthAgoResult.thisMonth) !== 0
                ? Number(entryNextMonth.total) + Number(entriesThisMonthAgoResult.thisMonth)
                : Number(entriesThisMonthAgoResult.thisMonth) + Number(entryNextMonth.total),
            thisMonth:
              Number(entriesLastMonthAgoResult.thisMonth) !== 0
                ? Number(entriesLastMonthAgoResult.thisMonth)
                : (Number(entriesThisMonthAgoResult.thisMonth) + Number(entryNextMonth.thisMonth)) /
                  2,
            date: format(addMonths(today, 2), "yyyy-MM-01"),
            type: "percentage",
          }
        : {
            total: Number(entryNextMonth.total) + Number(entryNextMonth.thisMonth),
            thisMonth: Number(entryNextMonth.thisMonth),
            date: format(addMonths(today, 2), "yyyy-MM-01"),
            type: "amount",
          };

    const entry3AheadMonth =
      entry2AheadMonth.type === "percentage"
        ? {
            total:
              Number(entriesLastMonthAgoResult.thisMonth) !== 0
                ? Number(entry2AheadMonth.total) +
                  (Number(entriesThisMonthAgoResult.thisMonth) +
                    Number(entriesLastMonthAgoResult.thisMonth)) /
                    2
                : Number(entry2AheadMonth.total) + Number(entry2AheadMonth.thisMonth),
            thisMonth:
              Number(entriesLastMonthAgoResult.thisMonth) !== 0
                ? (Number(entriesThisMonthAgoResult.thisMonth) +
                    Number(entriesLastMonthAgoResult.thisMonth)) /
                  2
                : (Number(entryNextMonth.thisMonth) + Number(entry2AheadMonth.thisMonth)) / 2,
            date: format(addMonths(today, 3), "yyyy-MM-01"),
            type: "percentage",
          }
        : {
            total: Number(entry2AheadMonth.total) + Number(entry2AheadMonth.thisMonth),
            thisMonth: Number(entry2AheadMonth.thisMonth),
            date: format(addMonths(today, 2), "yyyy-MM-01"),
            type: "amount",
          };

    return [
      entries3MonthAgoResult,
      entries2MonthAgoResult,
      entriesLastMonthAgoResult,
      entriesThisMonthAgoResult,
      entryNextMonth,
      entry2AheadMonth,
      entry3AheadMonth,
    ];
  }
}
