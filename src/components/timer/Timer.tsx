import { TtimerStatus } from "@/models/timer.model";
import { formatTime } from "@/utils/formatTime";
import styled from "styled-components";

interface Props {
  timerTime: number;
  status: TtimerStatus;
}

const Timer = ({ timerTime, status }: Props) => {
  return (
    <TimerContainer $isCritical={timerTime <= 3} $status={status}>
      {formatTime(timerTime)}
    </TimerContainer>
  );
};

const getColorByStatus = (status: TtimerStatus, theme: any) => {
  switch (status) {
    case "focusTime":
      return theme.color.pink6;
    case "shortBreakTime":
      return theme.color.pink4;
    case "longBreakTime":
      return theme.color.grey3;
    default:
      return theme.color.pink3;
  }
};

const TimerContainer = styled.div<{ $isCritical: boolean; $status: TtimerStatus }>`
  width: 335px;
  height: 335px;
  border-radius: 335px;
  background-color: ${({ $status, theme }) => getColorByStatus($status, theme)};
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
