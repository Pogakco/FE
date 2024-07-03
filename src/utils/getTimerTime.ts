import { ItimerStatus } from "@/models/timer.model";

export const getTimerTime = (
    differTime: number, 
    focusTime: number,
    breakTime: number,
    totalCycles: number,
    longBreakTime: number
): ItimerStatus => {
    const cycleDuration = focusTime + breakTime;
    const totalCycleTime = cycleDuration * totalCycles; 
    const totalCycleAndLongBreakTime = totalCycleTime + longBreakTime; 

    if (differTime > totalCycleAndLongBreakTime) { 
        return {status : "set", timerData : -1}
    } else if (differTime >= totalCycleTime) {
        return  {status : "longBreakTime", timerData : totalCycleAndLongBreakTime-differTime};
    }

    const remainderTime = differTime % cycleDuration;
    if (remainderTime < focusTime) {
        return  {status : "focusTime", timerData : focusTime - remainderTime};
    } else {
        return {status : "shortBreakTime", timerData : cycleDuration - remainderTime};
    }
}
