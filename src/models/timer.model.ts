export type TtimerStatus =
  | "focusTime"
  | "shortBreakTime"
  | "longBreakTime"
  | "set";

export interface ItimerStatus {
  status: TtimerStatus;
  timerData: number;
}
