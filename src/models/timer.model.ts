import { SOCKET_TIMER_STATUS } from "@/constants/socket";

export type TtimerStatus = typeof SOCKET_TIMER_STATUS[keyof typeof SOCKET_TIMER_STATUS];

export interface ItimerStatus {
  status: TtimerStatus;
  timerData: number;
}
