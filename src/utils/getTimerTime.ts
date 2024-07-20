import { SOCKET_TIMER_STATUS } from "@/constants/socket";
import { ItimerStatus } from "@/models/timer.model";
import { ServerTime } from "./serverTime";

export const getTimerTime = (
  differenceTime: number,
  focusTime: number,
  shortBreakTime: number,
  totalCycles: number,
  longBreakTime: number,
  syncedCurrentServerTime : ServerTime | null,
  playFocusAlarm: () => void,
  playShortBreakAlarm: () => void,
  playLongBreakAlarm: () => void,
  playEndAlarm: () => void
): ItimerStatus => {
  const syncTime = syncedCurrentServerTime ? syncedCurrentServerTime.getSyncTime() : 0
  console.log(syncTime)
  differenceTime = differenceTime-syncTime
  console.log(differenceTime, syncTime)
  const cycleDuration = focusTime + shortBreakTime;
  const totalCycleTime = cycleDuration * totalCycles;
  const totalCycleAndLongBreakTime = totalCycleTime + longBreakTime;

  if (differenceTime >= totalCycleAndLongBreakTime) {
    if (isEndTime()) playEndAlarm();
    return {
      status: SOCKET_TIMER_STATUS.END,
      timerData: SOCKET_TIMER_STATUS.END_POINT
    };
  } else if (differenceTime >= totalCycleTime) {
    if (isLongBreakTime(differenceTime, totalCycleTime)) playLongBreakAlarm();
    return {
      status: SOCKET_TIMER_STATUS.LONG_BREAK_TIME,
      timerData: totalCycleAndLongBreakTime - differenceTime
    };
  }

  const remainderTime = differenceTime % cycleDuration;
  if (remainderTime < focusTime) {
    if (isFocusTime(remainderTime)) playFocusAlarm();
    return {
      status: SOCKET_TIMER_STATUS.FOCUS_TIME,
      timerData: focusTime - remainderTime
    };
  } else {
    if (isShortBreakTime(remainderTime, focusTime)) playShortBreakAlarm();
    return {
      status: SOCKET_TIMER_STATUS.SHORT_BREAK_TIME,
      timerData: cycleDuration - remainderTime
    };
  }
};

const isFocusTime = (remainderTime: number) => {
  return remainderTime === 0;
};
const isShortBreakTime = (remainderTime: number, focusTime: number) => {
  return remainderTime === focusTime;
};
const isLongBreakTime = (differTime: number, totalTime: number) => {
  return differTime === totalTime;
};
const isEndTime = () => {
  return true;
};
