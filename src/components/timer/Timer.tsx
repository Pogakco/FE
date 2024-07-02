import { formatTime } from "@/utils/formatTime";
import styled from "styled-components";

interface Props {
  timerData : number;
}

const Timer = ({ timerData }: Props) => {

  return (
    <TimerContainer $isCritical={timerData <= 3}>
      {formatTime(timerData)}
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
