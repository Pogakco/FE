import Drawer from "@/components/drawer/Drawer";
import Timer from "@/components/timer/Timer";
import { useEffect} from "react";
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SquareButton from "@/components/buttons/SquareButton";
import useEmitSocket from "@/hooks/useEmitSocket";
import useFetchRoomDetail from "@/hooks/queries/useFetchRoomDetail";
import useTimer from "@/hooks/useTimer";
import useAlarm from "@/hooks/useAlarm";
import RoomButtons from "@/components/roomDetail/RoomButtons";
import useFetchRoomUsers from "@/hooks/queries/useFetchRoomUsers";
import { useQueryClient } from "@tanstack/react-query";
import { SOCKET_TIMER_STATUS } from "@/constants/socket";
import Loading from "@/components/commons/Loading";

const RoomDetail = () => {
  const { id } = useParams<{ id: string }>();
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
    handleClickRoomDeleteButton,
    clearSyncedData
  } = useEmitSocket();

  const {
    playFocusAlarm,
    playShortBreakAlarm,
    playLongBreakAlarm,
    playEndAlarm,
    changeMute,
    isMute
  } = useAlarm();

  const { timerTime, status } = useTimer({
    roomData,
    syncedStartedAt,
    syncedIsRunning,
    syncedCurrentCycles,
    playFocusAlarm,
    playShortBreakAlarm,
    playLongBreakAlarm,
    playEndAlarm
  });

  useEffect(() => {
    if (status === SOCKET_TIMER_STATUS.SET) {
      clearSyncedData();
      queryClient.invalidateQueries({queryKey: [`rooms/detail`]});
      queryClient.invalidateQueries({queryKey: ['rooms/users']});
    }
  }, [status, syncedIsRunning]);
  
  if (roomDataIsLoading || userDataIsLoading) {
    return <div><Loading/></div>;
  }

  if (!roomData || !userData) return;

  return (
    <RoomDetailStyle>
      <div className="muteIcon" onClick={changeMute}>
        {isMute ? <FaVolumeHigh /> : <FaVolumeXmark />}
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
      <Timer timerTime={timerTime} status={status} roomData={roomData} />
      <SquareButton
        buttonColor="active"
        buttonSize="medium"
        onClick={handleClickCyclesStartButton}
      >
        시작하기
      </SquareButton>
      <RoomButtons id={id} deleteButtonHandler={handleClickRoomDeleteButton} />
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
`;
export default RoomDetail;
