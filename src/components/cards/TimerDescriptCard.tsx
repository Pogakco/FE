import React from "react";
import { CgSandClock } from "react-icons/cg";
import { FaBook } from "react-icons/fa";
import { GiTomato } from "react-icons/gi";
import { IoIosAlarm } from "react-icons/io";
import styled from "styled-components";

type TCardScheme = "primary" | "default";

interface Props {
  totalCycles: number;
  currentCycle: number | null;
  focusTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  detail: boolean;
  scheme: TCardScheme;
}

const TimerDescriptCard = ({
  totalCycles,
  currentCycle,
  focusTime,
  shortBreakTime,
  longBreakTime,
  detail,
  scheme
}: Props) => {
  return (
    <TimerDescriptCardStyle $detail={detail} $scheme={scheme}>
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
        {detail && "뽀모도로 :"}{" "}
        <span>
          {currentCycle}/{totalCycles}회
        </span>
      </div>
    </TimerDescriptCardStyle>
  );
};

interface TimerDescriptCardStyleProps {
  $detail: boolean;
  $scheme: TCardScheme;
}
const TimerDescriptCardStyle = styled.div<TimerDescriptCardStyleProps>`
  width: ${({ $detail }) => ($detail ? "100%" : "70%")};
  height: auto;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: ${({ $detail }) => ($detail ? "20px 20px" : "0")};
  background-color: ${({ theme, $scheme }) =>
    $scheme === "primary" ? theme.color.pink6 : "#FFFFFF"};
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  div {
    display: flex;
    gap: 5px;
    align-items: center;
    color: ${({ theme, $scheme }) =>
      $scheme === "primary" ? theme.color.white : theme.color.black};
    font-size: ${({ theme }) => theme.fontSize.small};
    
    span {
      border: none;
      font-weight: ${({ $detail }) => ($detail ? "bold" : "")};
    }
  }
`;

export default TimerDescriptCard;
