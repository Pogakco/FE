import { SOCKET_TIMER_STATUS } from "@/constants/socket";
import { IroomData } from "@/models/room.model";
import { TtimerStatus } from "@/models/timer.model";
import { getDifferentTime } from "@/utils/getDifferentTime";
import { getTimerTime } from "@/utils/getTimerTime";
import { useEffect, useState } from "react";

interface IuseTimer {
    roomData: IroomData | undefined;
    syncedIsRunning : boolean | null;
    syncedStartedAt : string | null;
    syncedCurrentCycles : number | null;
}

const useTimer = ({roomData, syncedStartedAt, syncedIsRunning, syncedCurrentCycles} : IuseTimer) 
: {timerTime : number, status : TtimerStatus} => {
    const [timerTime, setTimerTime] = useState<number>(0);
    const [status, setStatus] = useState<TtimerStatus>(SOCKET_TIMER_STATUS.SHORT_BREAK_TIME);

    useEffect(() => {
        console.log(roomData)
        if (!roomData) return;
        console.log(roomData.startedAt, roomData.isRunning);
        const startAt = syncedStartedAt ? syncedStartedAt : roomData.startedAt;
        const isRunning = syncedIsRunning ? syncedIsRunning : roomData.isRunning;
        if (!isRunning) {
          setTimerTime(roomData.focusTime);
          setStatus(SOCKET_TIMER_STATUS.SHORT_BREAK_TIME)
        }
    
        if (startAt && isRunning) {
          const interval = setInterval(() => {
            const differenceTime = getDifferentTime(startAt);
            console.log('차이시간', differenceTime)
            const { focusTime, shortBreakTime, totalCycles, longBreakTime } = roomData;
            const { status, timerData } = getTimerTime(
              differenceTime,
              focusTime,
              shortBreakTime,
              totalCycles,
              longBreakTime
            );
            setStatus(status);
    
            if (status === SOCKET_TIMER_STATUS.SET) {
              console.log(syncedStartedAt, syncedCurrentCycles, syncedIsRunning, roomData)
              setTimerTime(roomData.focusTime);
              clearInterval(interval);
              setStatus(SOCKET_TIMER_STATUS.SHORT_BREAK_TIME)
            } else if (status) {
              setTimerTime(timerData);
            }
          }, 1000);
    
          return () => clearInterval(interval);
        }
      }, [syncedStartedAt, syncedCurrentCycles, syncedIsRunning, roomData]);

      return { timerTime, status};
}

export default useTimer