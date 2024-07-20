import Drawer from "@/components/drawer/Drawer";
import Timer from "@/components/timer/Timer";
import { useEffect, useState } from "react";
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import SquareButton from "@/components/buttons/SquareButton";
import useEmitSocket from "@/hooks/useEmitSocket";
import useFetchRoomDetail from "@/hooks/queries/useFetchRoomDetail";
import useTimer from "@/hooks/useTimer";
import useAlarm from "@/hooks/useAlarm";
import RoomButtons, { TMode } from "@/components/roomDetail/RoomButtons";
import useFetchRoomUsers from "@/hooks/queries/useFetchRoomUsers";
import { useQueryClient } from "@tanstack/react-query";
import { SOCKET_TIMER_STATUS } from "@/constants/socket";
import Loading from "@/components/commons/Loading";
import { getUserRankList } from "@/utils/getUserRankList";
import { useModalExit } from "@/store/modalExit";
import Modal from "@/components/modal/Modal";
import ModalRoomExit from "@/components/modal/modalContents/ModalRoomExit";
import { IoEye } from "react-icons/io5";

const RoomDetail = () => {
  const location = useLocation();
  const mode: TMode = location.state?.mode;

  const { id } = useParams<{ id: string }>();
  const { data: roomData, isLoading: roomDataIsLoading } =
    useFetchRoomDetail(id);

  const { data: userData, isLoading: userDataIsLoading } =
    useFetchRoomUsers(id);

  const queryClient = useQueryClient();

  const {
    syncedIsRunning,
    syncedAllParticipants,
    syncedCurrentCycles,
    syncedStartedAt,
    syncedCurrentServerTime,
    syncedAllLinkeduserIds,
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
    syncedCurrentServerTime,
    playFocusAlarm,
    playShortBreakAlarm,
    playLongBreakAlarm,
    playEndAlarm
  });

  const { onClose, modalOpen } = useModalExit();
  const [handleExit, setHandleExit] = useState<() => void>(() => {});

  useEffect(() => {
    if (status === SOCKET_TIMER_STATUS.END) {
      clearSyncedData();
      queryClient.invalidateQueries({ queryKey: [`rooms/detail`] });
      queryClient.invalidateQueries({ queryKey: ["rooms/users"] });
    }
  }, [status, syncedIsRunning]);

  if (roomDataIsLoading || userDataIsLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (!roomData || !userData) return;

  return (
    <RoomDetailStyle>
      {modalOpen && (
        <Modal onClose={onClose} setIsModal={() => {}} isRecheckType>
          <ModalRoomExit onCancel={onClose} onExit={handleExit} />
        </Modal>
      )}
      <div className="muteIcon" onClick={changeMute}>
        {isMute ? <FaVolumeXmark /> : <FaVolumeHigh />}
      </div>
      <div className="mode">
        {mode === "watch" && (
          <>
            <IoEye />
            관전모드
          </>
        )}
      </div>
      <Drawer
        roomData={roomData}
        isRunning={syncedIsRunning}
        currentCycle={
          status === SOCKET_TIMER_STATUS.SET || !syncedCurrentCycles
            ? roomData.currentCycles
            : syncedCurrentCycles
        }
        participants={getUserRankList(
          syncedAllParticipants,
          syncedAllLinkeduserIds
        )}
        activeUsers={
          status === SOCKET_TIMER_STATUS.SET || !syncedAllParticipants
            ? userData.activeParticipants
            : syncedAllParticipants.length
        }
      />
      <Timer timerTime={timerTime} status={status} roomData={roomData} />
      <SquareButton
        buttonColor={(syncedIsRunning) ? "default" : "active"}
        disabled={syncedIsRunning ? true : false}
        buttonSize="medium"
        onClick={handleClickCyclesStartButton}
      >
        시작하기
      </SquareButton>
      <RoomButtons
        id={id}
        deleteButtonHandler={handleClickRoomDeleteButton}
        mode={mode}
        setExit={setHandleExit}
      />
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
    right: 65px;
    font-size: 50px;
    color: ${({ theme }) => theme.color.pink6};
    cursor: pointer;

    svg {
      width: 40px;
      height: 40px;
    }
  }

  .mode {
    display: flex;
    align-items: center;
    gap: 10px;
    position: absolute;
    top: 40px;
    left: 110px;
    white-space: nowrap;
    height: 40px;
    color: #d9d9d9;
    svg {
      width: 100%;
      height: 100%;
    }
  }
`;
export default RoomDetail;
