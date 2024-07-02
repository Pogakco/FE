import { TtimerStatus } from "@/models/timer.model";
import { formatTime } from "@/utils/formatTime";
import { useState, useEffect } from "react";
import styled from "styled-components";

interface Props {
  focusTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  totalCycles: number;
  startedAt: string;
  isRunning: boolean;
  setCurrentTimerStatus: React.Dispatch<React.SetStateAction<TtimerStatus>>
}

const Timer = ({ focusTime, shortBreakTime, longBreakTime, isRunning, setCurrentTimerStatus }: Props) => {
  const [statusStep, setStatusStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(focusTime);

  const timerStatus: { time: number; label: TtimerStatus }[] = [
    { time: focusTime, label: "focusTime" as TtimerStatus },
    { time: shortBreakTime, label: "shortBreakTime" as TtimerStatus },
    { time: longBreakTime, label: "longBreakTime" as TtimerStatus }
  ];

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      setStatusStep((prevStep) => (prevStep + 1) % timerStatus.length);
    }
  }, [timeLeft, isRunning]);

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft === 0) {
      setTimeLeft(timerStatus[statusStep].time);
      setCurrentTimerStatus(timerStatus[statusStep].label);
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning, timeLeft, statusStep, timerStatus, setCurrentTimerStatus]);

  return (
    <TimerContainer $isCritical={timeLeft <= 3}>
      {formatTime(timeLeft)}
    </TimerContainer>
  );
};

const TimerContainer = styled.div<{ $isCritical: boolean }>`
  width: 335px;
  height: 335px;
  border-radius: 335px;
  background-color: #ff8080;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 64px;
  font-weight: bold;
  color: white;
  margin-bottom: 40px;
  transition: all 0.2s;
`;

export default Timer;
