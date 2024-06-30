import { CgSandClock } from "react-icons/cg";
import { FaBook } from "react-icons/fa";
import { GiTomato } from "react-icons/gi";
import { IoIosAlarm } from "react-icons/io";
import styled from "styled-components";

interface Props {
  totalCycles: number;
  currentCycles: number;
  focusTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  detail: boolean;
}

const TimerDescriptCard = ({ totalCycles, currentCycles, focusTime, shortBreakTime, longBreakTime, detail }: Props) => {
  return (
    <TimerDescriptCardStyle $detail={detail}>
      <div>
        <FaBook />
        {detail && "집중시간 :"} <span>{focusTime}분</span>
      </div>
      <div>
        <IoIosAlarm />
        {detail && "대휴식 :"} <span>{longBreakTime}분</span>
      </div>
      <div>
        <CgSandClock />
        {detail && "휴식시간 :"} <span>{shortBreakTime}분</span>
      </div>
      <div>
        <GiTomato />
        {detail && "뽀모도로 :"} <span>{currentCycles}/{totalCycles}회</span>
      </div>
    </TimerDescriptCardStyle>
  );
};

const TimerDescriptCardStyle = styled.div<{ $detail : boolean}>`
  width: ${({ $detail }) => $detail ? "100%" : "70%"};
  height: auto;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: ${({ $detail }) => $detail ? "20px 20px" : "0"};
  background-color: ${({ theme, $detail }) => $detail ? theme.color.pink6 : theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.white};
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  div {
    display: flex;
    gap: 5px;
    align-items: center;
    color: ${({ theme, $detail }) => $detail ? theme.color.white : theme.color.black};
    font-size: ${({ theme }) => theme.fontSize.small};
    span {
      font-weight : ${({ $detail }) => $detail ? "bold" : ""};
    }
  }
`;

export default TimerDescriptCard;
