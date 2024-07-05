import { IroomData } from "@/models/room.model";
import { TtimerStatus } from "@/models/timer.model";
import { getDiffrentTime } from "@/utils/getDiffrentTime";
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
    const [status, setStatus] = useState<TtimerStatus>("shortBreakTime");

    useEffect(() => {
        console.log(roomData)
        if (!roomData) return;
        console.log(roomData.startedAt, roomData.isRunning);
        const startAt = syncedStartedAt ? syncedStartedAt : roomData.startedAt;
        const isRunning = syncedIsRunning ? syncedIsRunning : roomData.isRunning;
        if (!isRunning) {
          setTimerTime(roomData.focusTime);
          setStatus("shortBreakTime")
        }
    
        if (startAt && isRunning) {
          const interval = setInterval(() => {
            const differTime = getDiffrentTime(startAt);
            console.log('차이시간', differTime)
            const { focusTime, shortBreakTime, totalCycles, longBreakTime } = roomData;
            const { status, timerData } = getTimerTime(
              differTime,
              focusTime,
              shortBreakTime,
              totalCycles,
              longBreakTime
            );
            setStatus(status);
    
            if (status === "set") {
              console.log(syncedStartedAt, syncedCurrentCycles, syncedIsRunning, roomData)
              setTimerTime(roomData.focusTime);
              clearInterval(interval);
              setStatus("shortBreakTime")
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