export type Score = number | null;
export interface DailyReport {
  id: string;
  timestamp: string;
  date: string;
  weekday: string;
  sleep: string;
  morningFatigue: Score;
  eveningFatigue: Score;
  attendance: string;
  stress: Score;
  satisfaction: Score;
  stressCauses: string[];
  contacts: string[];
  positiveImpact: string;
  negativeImpact: string;
  overallRating: Score;
  note: string;
}
export type Filter = {
  field: keyof DailyReport;
  value: string;
  mode: "equals" | "contains";
};
export type View = "overview" | "explore" | "ranking";
