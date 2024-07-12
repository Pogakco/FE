import CircleButton from "@/components/buttons/CircleButton";
import Drawer from "@/components/drawer/Drawer";
import Timer from "@/components/timer/Timer";
import { useEffect, useRef, useState } from "react";
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import SquareButton from "@/components/buttons/SquareButton";
import useEmitSocket from "@/hooks/useEmitSocket";
import useFetchRoomDetail from "@/hooks/queries/useFetchRoomDetail";
import useTimer from "@/hooks/useTimer";
import useFetchRoomUsers from "@/hooks/queries/useFetchRoomUsers";
import { useQueryClient } from "@tanstack/react-query";
import { SOCKET_TIMER_STATUS } from "@/constants/socket";
import Loading from "@/components/commons/Loading";

const RoomDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeSound, setActiveSound] = useState<boolean>(false);
  const {
    data: roomData,
    isLoading: roomDataIsLoading,
  } = useFetchRoomDetail(id);
  const {
    data: userData,
    isLoading: userDataIsLoading,
  } = useFetchRoomUsers(id);
  const queryClient = useQueryClient();

  const {
    syncedIsRunning,
    syncedAllParticipants,
    syncedCurrentCycles,
    syncedStartedAt,
    handleClickCyclesStartButton,
    clearSyncedData
  } = useEmitSocket();
  const navigate = useNavigate();
  const { timerTime, status } = useTimer({
    roomData,
    syncedStartedAt,
    syncedIsRunning,
    syncedCurrentCycles
  });
  useEffect(() => {
    if (status === SOCKET_TIMER_STATUS.SET) {
      clearSyncedData();
      queryClient.invalidateQueries({queryKey: ['rooms']});
      queryClient.invalidateQueries({queryKey: ['rooms/users']});
      console.log(roomData, userData)
    }
  }, [status, syncedIsRunning]);
  const soundHandler = () => {
    setActiveSound(!activeSound);
  };

  const exitButtonHandler = () => {
    navigate("/");
  };

  if (roomDataIsLoading || userDataIsLoading) {
    return <div><Loading/></div>;
  }

  if (!roomData || !userData) return null;

  return (
    <RoomDetailStyle>
      <div className="muteIcon" onClick={soundHandler}>
        {activeSound ? <FaVolumeXmark /> : <FaVolumeHigh />}
      </div>
      <Drawer
        roomData={roomData}
        isRunning={status !== SOCKET_TIMER_STATUS.SET}
        currentCycle={
          (status === SOCKET_TIMER_STATUS.SET) || !syncedCurrentCycles ? roomData.currentCycles : syncedCurrentCycles
        }
        participants={
          (status === SOCKET_TIMER_STATUS.SET) || !syncedAllParticipants ? userData.users : syncedAllParticipants
        }
        activeUsers={
          (status === SOCKET_TIMER_STATUS.SET) || !syncedAllParticipants ? userData.activeParticipants : syncedAllParticipants.length
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
    top: 40px;
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
