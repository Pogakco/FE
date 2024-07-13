import { SOCKET_TIMER_STATUS } from "@/constants/socket";
import { IroomData } from "@/models/room.model";
import { TtimerStatus } from "@/models/timer.model";
import { getDifferentTime } from "@/utils/getDifferentTime";
import { getTimerTime } from "@/utils/getTimerTime";
import { useEffect, useState } from "react";

interface IuseTimer {
  roomData: IroomData | undefined;
  syncedIsRunning: boolean | null;
  syncedStartedAt: string | null;
  syncedCurrentCycles: number | null;
  playFocusAlarm: () => void;
  playShortBreakAlarm: () => void;
  playLongBreakAlarm: () => void;
  playEndAlarm: () => void;
}

const useTimer = ({
  roomData,
  syncedStartedAt,
  syncedIsRunning,
  syncedCurrentCycles,
  playFocusAlarm,
  playShortBreakAlarm,
  playLongBreakAlarm,
  playEndAlarm
}: IuseTimer): { timerTime: number; status: TtimerStatus } => {
  const [timerTime, setTimerTime] = useState<number>(0);
  const [status, setStatus] = useState<TtimerStatus>(
    SOCKET_TIMER_STATUS.SET
  );

  useEffect(() => {
    if (!roomData) return;
    const startAt = syncedStartedAt ? syncedStartedAt : roomData.startedAt;
    const isRunning = syncedIsRunning ? syncedIsRunning : roomData.isRunning;
    if (!isRunning) {
      setTimerTime(roomData.focusTime);
    }

    if (isRunning) {
      const interval = setInterval(() => {
        const differenceTime = getDifferentTime(startAt);
        const { focusTime, shortBreakTime, totalCycles, longBreakTime } =
          roomData;
        const { status, timerData } = getTimerTime(
          differenceTime,
          focusTime,
          shortBreakTime,
          totalCycles,
          longBreakTime,
          playFocusAlarm,
          playShortBreakAlarm,
          playLongBreakAlarm,
          playEndAlarm
        );
        setStatus(status);
        if (status === SOCKET_TIMER_STATUS.END) {
          setTimerTime(roomData.focusTime);
          clearInterval(interval);
        } else if (status) {
          setTimerTime(timerData);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [syncedStartedAt, syncedCurrentCycles, syncedIsRunning, roomData]);

  return { timerTime, status };
};

export default useTimer;
