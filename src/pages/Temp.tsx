import { useEffect, useState } from "react";
import {socket} from "./socket.ts";

interface RoomInfo {
  totalCycles: number;
  currentCycle: number;
  focusTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  isRunning: boolean;
  pomodoroCount: number;
}

type Mode = "pending" | "focus" | "shortBreak" | "longBreak";

export default function Temp() {
  const [mode, setMode] = useState<Mode>("pending");
  const [roomInfo, setRoomInfo] = useState<RoomInfo>();
  const [cycleStarted, setCycleStarted] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [focusTime, setFocusTime] = useState(0);
  const [restBreakTime, setRestBreakTime] = useState<number | null>(null);

  const handleClickCyclesStartButton = () => {
    if (cycleStarted) return;

    socket.emit("start-cycles");
    setCycleStarted(true);
  };

  useEffect(() => {
    const onForwardedRoomInfo = (roomInfo: RoomInfo) => {
      setRoomInfo(roomInfo);
      setCurrentCycle(roomInfo.currentCycle);
      setPomodoroCount(roomInfo.pomodoroCount);
    };
    const onIncreasedFocusTime = (focusTime: number) => {
      setFocusTime(focusTime);
      setMode("focus");
    };
    const onDecreasedRestShortBreakTime = (restBreakTime: number) => {
      setRestBreakTime(restBreakTime);
      setMode("shortBreak");
    };
    const onFinishedBreakTime = () => {
      setCurrentCycle((prev) => prev + 1);
      setPomodoroCount((prev) => prev + 1); // TODO: 집중 시간 도중에 들어와서 1초만 있어도 1 오름
    };
    const onDecreasedRestLongBreakTime = (restBreakTime: number) => {
      setRestBreakTime(restBreakTime);
      setMode("longBreak");
    };
    const onFinishedCycles = () => {
      setMode("pending");
      setCycleStarted(false);
      setCurrentCycle(0);
    };

    socket.on("forward-initial-info", onForwardedRoomInfo);
    socket.on("increase-focus-time", onIncreasedFocusTime);
    socket.on("decrease-rest-short-break-time", onDecreasedRestShortBreakTime);
    socket.on("finish-break-time", onFinishedBreakTime);
    socket.on("decrease-rest-long-break-time", onDecreasedRestLongBreakTime);
    socket.on("finish-cycles", onFinishedCycles);

    return () => {
      socket.off("increase-focus-time", onIncreasedFocusTime);
      socket.off(
        "decrease-rest-short-break-time",
        onDecreasedRestShortBreakTime
      );
      socket.off("finish-break-time", onFinishedBreakTime);
      socket.on("decrease-rest-long-break-time", onDecreasedRestLongBreakTime);
      socket.off("finish-cycles", onFinishedCycles);
    };
  }, []);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        width: "100vw",
      }}
    >
      {roomInfo && (
        <div>
          <h3>총 사이클 수: {roomInfo.totalCycles}</h3>
          <h3>현재 사이클: {currentCycle}</h3>
          <h3>집중 시간: {roomInfo.focusTime}초</h3>
          <h3>휴식 시간: {roomInfo.shortBreakTime}초</h3>
          <h3>장기 휴식 시간: {roomInfo.longBreakTime}초</h3>
          <h3>내 뽀모도로 횟수: {pomodoroCount}번</h3>
        </div>
      )}

      {mode === "focus" && <h1>집중 시간: {focusTime}</h1>}

      {mode === "shortBreak" && <h1>남은 휴식 시간: {restBreakTime}</h1>}

      {mode === "longBreak" && (
        <h1>모든 사이클 끝 & 휴식 시간: {restBreakTime}</h1>
      )}

      <button
        disabled={mode !== "pending"}
        onClick={handleClickCyclesStartButton}
      >
        사이클 시작
      </button>
    </div>
  );
}