import CircleButton from "@/components/buttons/CircleButton";
import Drawer from "@/components/drawer/Drawer";
import Timer from "@/components/timer/Timer";
import { useEffect, useState } from "react";
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import SquareButton from "@/components/buttons/SquareButton";
import useEmitSocket from "@/hooks/useEmitSocket";
import { getDiffrentTime } from "@/utils/getDiffrentTime";
import { getTimerTime } from "@/utils/getTimerTime";
import { TtimerStatus } from "@/models/timer.model";
import useFetchRoomDetail from "@/hooks/queries/useFetchRoomDetail";

const RoomDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeSound, setActiveSound] = useState<boolean>(false);
  const { data: roomData, isLoading, error } = useFetchRoomDetail(id);
  const [timerTime, setTimerTime] = useState<number>(0);
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

  useEffect(() => {
    console.log(roomData)
    if (!roomData) return;
    console.log(roomData.startedAt, roomData.isRunning);
    const startAt = syncedStartedAt ? syncedStartedAt : roomData.startedAt;
    const isRunning = syncedIsRunning ? syncedIsRunning : roomData.isRunning;
    if (!isRunning) {
      setTimerTime(roomData.focusTime);
      setStatus("shortBreakTime")
    }

    if (startAt && isRunning) {
      const interval = setInterval(() => {
        const differTime = getDiffrentTime(startAt);
        console.log('차이시간', differTime)
        const { focusTime, shortBreakTime, totalCycles, longBreakTime } = roomData;
        const { status, timerData } = getTimerTime(
          differTime,
          focusTime,
          shortBreakTime,
          totalCycles,
          longBreakTime
        );
        setStatus(status);

        if (status === "set") {
          setTimerTime(roomData.focusTime);
          clearInterval(interval);
        } else if (status) {
          setTimerTime(timerData);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [syncedStartedAt, syncedCurrentCycles, syncedIsRunning, roomData]);

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (error) {
    return <div>에러 {error.message}</div>;
  }

  if (!roomData) {
    return <div>방 정보 없음</div>;
  }

  return (
    <RoomDetailStyle>
      <div className="muteIcon" onClick={soundHandler}>
        {activeSound ? <FaVolumeXmark /> : <FaVolumeHigh />}
      </div>
      <Drawer
        roomData={roomData}
        isRunning={syncedIsRunning ? syncedIsRunning : roomData.isRunning}
        currentCycle={
          syncedCurrentCycles ? syncedCurrentCycles : roomData.currentCycles
        }
      />
      <Timer timerData={timerTime} status={status} />
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
