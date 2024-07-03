import CircleButton from "@/components/buttons/CircleButton";
import Drawer from "@/components/drawer/Drawer";
import Timer from "@/components/timer/Timer";
import { IroomData } from "@/models/room.model";
import { useEffect, useState } from "react";
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SquareButton from "@/components/buttons/SquareButton";
import useEmitSocket from "@/hooks/useEmitSocket";
import { getDiffrentTime } from "@/utils/getDiffrentTime";
import { getTimerTime } from "@/utils/getTimerTime";
import { TtimerStatus } from "@/models/timer.model";

const roomData: IroomData = {
  roomTitle: "뽀모도로 정예부대 구해요",
  roomDescription: `더도 말고 우리 딱 코딩으로 연봉 1억 받을 정도로만 
    열심히해요 내일도 오늘도 화이팅 코딩 열심히해서 
    맛있는 음식도 많이 먹어요`,
  totalCycles: 3,
  currentCycles: 0,
  focusTime: 8,
  shortBreakTime: 5,
  longBreakTime: 10,
  isRunning: false,
  maxParticipants: 20,
  currentParticipants: 15,
  ownerName: "changchangwoo",
  ownerProfileImageUrl: "https://example.com/profile.jpg"
};

const RoomDetail = () => {
  const [activeSound, setActiveSound] = useState<boolean>(false);
  const [timerTime, setTimerTime] = useState<number>(roomData.focusTime);
  const [status, setStatus] = useState<TtimerStatus>("shortBreakTime");
  const {
    syncedIsRunning,
    syncedAllParticipants,
    syncedCurrentCycles,
    syncedStartedAt,
    handleClickCyclesStartButton
  } = useEmitSocket();

  const navigate = useNavigate();
  const soundHandler = () => {
    setActiveSound(!activeSound);
  };
  const exitButtonHandler = () => {
    navigate("/");
  };

  // TODO : useEffect 훅으로 분리, 
  // 중간 참여 로직 반영 안됨, undefined에 처음 초깃값 입력
  useEffect(() => {
    const startAt = syncedStartedAt ? syncedStartedAt : undefined
    if (startAt) {
        const interval = setInterval(() => {
            const differTime = getDiffrentTime(startAt);
            const focusTime = roomData.focusTime;
            const breakTime = roomData.shortBreakTime;
            const totalCycles = roomData.totalCycles;
            const longBreakTime = roomData.longBreakTime;

            const {status, timerData} = getTimerTime(differTime, focusTime, breakTime, totalCycles, longBreakTime);
            setStatus(status);
            if (status === "set") {
              setTimerTime(roomData.focusTime);
          } else if (status) {
              setTimerTime(timerData);
          }
        }, 1000);

        return () => clearInterval(interval);
    }
}, [syncedStartedAt, syncedCurrentCycles, syncedIsRunning]);

  return (
    <RoomDetailStyle>
      <div className="muteIcon" onClick={soundHandler}>
        {activeSound ? <FaVolumeXmark /> : <FaVolumeHigh />}
      </div>
      <Drawer roomData={roomData} 
      isRunning={syncedIsRunning ? syncedIsRunning : roomData.isRunning}
      currentCycle={syncedCurrentCycles ? syncedCurrentCycles : roomData.currentCycles}

      
      />
      <Timer
        timerData={timerTime}
        status={status}
      />
      <SquareButton
        buttonColor="active"
        buttonSize="medium"
        onClick={handleClickCyclesStartButton}
      >
        시작하기
      </SquareButton>
      <div className="exitButton">
        <CircleButton buttonSize={"large"} onClick={exitButtonHandler}>
          <RiLogoutBoxRLine />
        </CircleButton>
      </div>
    </RoomDetailStyle>
  );
};

const RoomDetailStyle = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  .muteIcon {
    position: absolute;
    top: 100px;
    right: 50px;
    font-size: 50px;
    color: #ff8080;
    cursor: pointer;
  }

  .exitButton {
    position: absolute;
    bottom: 50px;
    right: 50px;
  }
`;
export default RoomDetail;
