import { IroomData } from "@/models/room.model";
import { TtimerStatus } from "@/models/timer.model";
import { formatTime } from "@/utils/formatTime";
import { getColorByStatus, getMessageByStatus, percent } from "@/utils/timerUi";
import { CircularProgressbar } from "react-circular-progressbar";
import styled, { useTheme } from "styled-components";

interface Props {
  timerTime: number;
  status: TtimerStatus;
  roomData: IroomData;
}

const Timer = ({ timerTime, status, roomData }: Props) => {
  const theme = useTheme();
  const progressBarColor = getColorByStatus(status, theme);
  return (
    <TimerStyle $status={status}>
      <CircularProgressbar
        className="circular"
        value={percent(status, timerTime, roomData)}
        strokeWidth={6}
        styles={{
          path: {
            stroke: progressBarColor.main,
            height: "100%",
            strokeLinecap: "round",
            transition: "stroke-dashoffset 1s linear 0s"
          },
          trail: {
            stroke: progressBarColor.trail
          }
        }}
      />
      <div className="time"> {formatTime(timerTime)}</div>
      <div className="message">{getMessageByStatus(status)}</div>
    </TimerStyle>
  );
};

interface TimerStyleProps {
  $status: TtimerStatus;
}
const TimerStyle = styled.div<TimerStyleProps>`
  position: relative;
  z-index: -1;

  .circular {
    width: 335px;
    height: 335px;
  }
  .time {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);
    font-size: 64px;
    font-weight: semibold;
    transition: all 0.2s;
    color: ${({ $status, theme }) => getColorByStatus($status, theme).main};
  }
  .message {
    position: absolute;
    bottom: 110px;
    left: 50%;
    transform: translate(-50%, 0);
    font-weight: semibold;
    color: ${({ $status, theme }) => getColorByStatus($status, theme).main};
  }

  margin-bottom: 20px;
`;

export default Timer;
