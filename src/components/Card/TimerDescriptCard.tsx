import { CgSandClock } from "react-icons/cg";
import { FaBook } from "react-icons/fa";
import { GiTomato } from "react-icons/gi";
import { IoIosAlarm } from "react-icons/io";
import styled from "styled-components";

const TimerDescriptCard = () => {
  return (
    <TimerDescriptCardStyle>
      <div>
        <FaBook />
        집중시간 :  <span>30분</span>
      </div>
      <div>
        <IoIosAlarm />
        대휴식 : <span>40분</span>
      </div>
      <div>
        <CgSandClock />
        휴식시간 : <span>15분</span>
      </div>
      <div>
        <GiTomato />
        뽀모도로 : <span>15분</span>
      </div>
    </TimerDescriptCardStyle>
  );
};

const TimerDescriptCardStyle = styled.div`
  width: 100%;
  height: 90px;
  border-radius: 8px;
  padding: 20px;
  background-color: ${({ theme }) => theme.color.pink6};
  border: 1px solid ${({ theme }) => theme.color.white};;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 20px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({ theme }) => theme.color.white};
    font-size: ${({ theme }) => theme.fontSize.medium};
    span {
        font-weight: bold;
    }
  }
`;
export default TimerDescriptCard;
