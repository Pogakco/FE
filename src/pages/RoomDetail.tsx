import CircleButton from "@/components/buttons/CircleButton";
import Drawer from "@/components/drawer/Drawer";
import Timer from "@/components/timer/Timer";
import { useState } from "react";
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import SquareButton from "@/components/buttons/SquareButton";
import useEmitSocket from "@/hooks/useEmitSocket";
import useFetchRoomDetail from "@/hooks/queries/useFetchRoomDetail";
import useTimer from "@/hooks/useTimer";

const RoomDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeSound, setActiveSound] = useState<boolean>(false);
  const { data: roomData, isLoading, error } = useFetchRoomDetail(id);
  const {
    syncedIsRunning,
    syncedAllParticipants,
    syncedCurrentCycles,
    syncedStartedAt,
    handleClickCyclesStartButton
  } = useEmitSocket();
  const navigate = useNavigate();

  const {timerTime, status} = useTimer({roomData, syncedStartedAt, syncedIsRunning, syncedCurrentCycles})
  const soundHandler = () => {
    setActiveSound(!activeSound);
  };

  const exitButtonHandler = () => {
    navigate("/");
  };

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
      <Timer timerTime={timerTime} status={status} />
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
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  .muteIcon {
    position: absolute;
    top:40px;
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
