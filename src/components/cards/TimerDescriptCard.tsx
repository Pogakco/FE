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
}

const TimerDescriptCard = ({totalCycles, currentCycles,focusTime,shortBreakTime,longBreakTime } : Props) => {
  return (
    <TimerDescriptCardStyle>
      <div>
        <FaBook />
        집중시간 :  <span>{focusTime}분</span>
      </div>
      <div>
        <IoIosAlarm />
        대휴식 : <span>{longBreakTime}분</span>
      </div>
      <div>
        <CgSandClock />
        휴식시간 : <span>{shortBreakTime}분</span>
      </div>
      <div>
        <GiTomato />
        뽀모도로 : <span>{currentCycles}/{totalCycles}회</span>
      </div>
    </TimerDescriptCardStyle>
  );
};

const TimerDescriptCardStyle = styled.div`
  width: 100%;
  height: 90px;
  border-radius: 8px;
  padding: 20px 20px;
  background-color: ${({ theme }) => theme.color.pink6};
  border: 1px solid ${({ theme }) => theme.color.white};;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  div {
    display: flex;
    gap: 5px;
    align-items: center;
    color: ${({ theme }) => theme.color.white};
    font-size: ${({ theme }) => theme.fontSize.small};
    span {
        font-weight: bold;
    }
  }
`;
export default TimerDescriptCard;