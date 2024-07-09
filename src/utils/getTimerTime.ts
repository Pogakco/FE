import { SOCKET_TIMER_STATUS } from "@/constants/socket";
import { ItimerStatus } from "@/models/timer.model";

export const getTimerTime = (
    differenceTime: number, 
    focusTime: number,
    shortBreakTime: number,
    totalCycles: number,
    longBreakTime: number
): ItimerStatus => {
    const cycleDuration = focusTime + shortBreakTime;
    const totalCycleTime = cycleDuration * totalCycles; 
    const totalCycleAndLongBreakTime = totalCycleTime + longBreakTime; 

    if (differenceTime >= totalCycleAndLongBreakTime) { 
        return {status : SOCKET_TIMER_STATUS.SET, timerData : SOCKET_TIMER_STATUS.END_POINT}
    } else if (differenceTime >= totalCycleTime) {
        return  {status : SOCKET_TIMER_STATUS.LONG_BREAK_TIME, timerData : totalCycleAndLongBreakTime-differenceTime};
    }

    const remainderTime = differenceTime % cycleDuration;
    if (remainderTime < focusTime) {
        return  {status : SOCKET_TIMER_STATUS.FOCUS_TIME, timerData : focusTime - remainderTime};
    } else {
        return {status : SOCKET_TIMER_STATUS.SHORT_BREAK_TIME, timerData : cycleDuration - remainderTime};
    }
}
