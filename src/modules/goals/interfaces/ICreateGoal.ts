export interface ICreateGoal {
  id?: string;
  user_id: string;
  name: string;
  income_type: string;
  income_value: number;
  end_by: string;
  end_by_value: string;
  finished?: boolean;
  color: string;
}
