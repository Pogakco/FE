import { TtimerStatus } from "@/models/timer.model";
import { formatTime } from "@/utils/formatTime";
import { useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import styled, { useTheme } from "styled-components";

interface Props {
  timerTime: number;
  status: TtimerStatus;
}

const percent = (status: TtimerStatus, current: number) => {
  let total;
  switch (status) {
    case "focusTime":
      total = 25;
      break;
    case "shortBreakTime":
      total = 5;
      break;
    case "longBreakTime":
      total = 30;
      break;
    default:
      return 0;
  }
  return ((total - current + 1) / total) * 100;
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

const Timer = ({ timerTime, status }: Props) => {
  const theme = useTheme();
  const progressBarColor = getColorByStatus(status, theme);
  useEffect(() => {
    if (timerTime === 0) {
      // 타이머 컴포넌트 제렌더링하여 100프로였떤 집중시간 -> 0프로로 되돌아가는 작업없이 바로 쉬는시간 0부터 시작하게끔
    }
  }, [timerTime]);

  return (
    <TimerStyle>
      <svg style={{ height: 0, width: 0 }}>
        <defs>
          <linearGradient id="progress" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="#FF0068" />
            <stop offset="70%" stopColor="#FF4D27" />
            <stop offset="100%" stopColor="#FF7A01" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgressbar
        className="circular"
        value={percent(status, timerTime)}
        strokeWidth={8}
        styles={{
          path: {
            // stroke: `url(#progress)`,
            stroke: progressBarColor,
            height: "100%",
            strokeLinecap: "round",
            transition: "stroke-dashoffset 1s linear 0s"
          },
          trail: {
            stroke: "white"
          }
        }}
      />
      <TimerContainer $isCritical={timerTime <= 3} $status={status}>
        {formatTime(timerTime)}
      </TimerContainer>
    </TimerStyle>
  );
};

const TimerStyle = styled.div`
  .circular {
    width: 335px;
    height: 335px;
  }
`;

const TimerContainer = styled.div<{
  $isCritical: boolean;
  $status: TtimerStatus;
}>`
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
