import Drawer from "@/components/drawer/Drawer";
import Timer from "@/components/timer/Timer";
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SquareButton from "@/components/buttons/SquareButton";
import useEmitSocket from "@/hooks/useEmitSocket";
import useFetchRoomDetail from "@/hooks/queries/useFetchRoomDetail";
import useTimer from "@/hooks/useTimer";
import useAlarm from "@/hooks/useAlarm";
import RoomButtons from "@/components/roomDetail/RoomButtons";

const RoomDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: roomData, isLoading, error } = useFetchRoomDetail(id);
  const {
    syncedIsRunning,
    syncedAllParticipants,
    syncedCurrentCycles,
    syncedStartedAt,
    handleClickCyclesStartButton
  } = useEmitSocket();

  const {
    playFocusAlarm,
    playShortBreakAlarm,
    playLongBreakAlarm,
    playEndAlarm,
    changeMute,
    isMute
  } = useAlarm();

  console.log(syncedAllParticipants);

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
      <div className="muteIcon" onClick={changeMute}>
        {isMute ? <FaVolumeHigh /> : <FaVolumeXmark />}
      </div>
      <Drawer
        roomData={roomData}
        isRunning={syncedIsRunning ? syncedIsRunning : roomData.isRunning}
        currentCycle={
          syncedCurrentCycles ? syncedCurrentCycles : roomData.currentCycles
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
      <RoomButtons id={id} />
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
