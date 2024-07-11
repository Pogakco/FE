import { SOCKET_CONNECTION, SOCKET_TIMER_EVENTS, SOCKET_URL } from "@/constants/socket";
import { IParticipant } from "@/models/roomDetail.model";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Socket, io } from "socket.io-client";

const useEmitSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [syncedIsRunning, setSyncedIsRunning] = useState<boolean | null>(null);
  const [syncedStartedAt, setSyncedStartedAt] = useState<string | null>(null);
  const [syncedCurrentCycles, setSyncedCurrentCycles] = useState<number | null>(
    null
  );
  const [syncedAllParticipants, setSyncedAllParticipants] = useState<
    IParticipant[] | null
  >(null);

  const handleClickCyclesStartButton = () => {
    if (!socket) return;
    socket.emit(SOCKET_TIMER_EVENTS.START_CYCLES);
  };

  useEffect(() => {
    const roomId = location.pathname.match(/\/rooms\/(\d+)/)![1];
    const socket = io(`${SOCKET_URL}${roomId}`, {
      withCredentials: true
    });

    /* 테스트 필요 */
    socket.on(SOCKET_CONNECTION.CONNECT, () => {
      toast.success("성공적으로 방에 입장하셨습니다.");
    });

    socket.on(SOCKET_CONNECTION.CONNECT_ERROR, (error) => {
      toast.error("방 입장에 잠시 오류가 생겼습니다", error);
    });

    socket.on(SOCKET_CONNECTION.DISCONNECT, () => {
      // toast.success("방을 잠시 나오셨습니다.");
    });

    setSocket(socket);
    const onSyncedIsRunning = (isRunning: boolean) => {
      setSyncedIsRunning(isRunning);
    };
    const onSyncedStartedAt = (startedAt: string) => {
      setSyncedStartedAt(startedAt);
    };
    const onSyncedCurrentCycles = (currentCycles: number) => {
      setSyncedCurrentCycles(currentCycles);
    };
    const onSyncedAllParticipants = (allParticipants: IParticipant[]) => {
      setSyncedAllParticipants(allParticipants);
    };
    socket.on(SOCKET_TIMER_EVENTS.SYNC_IS_RUNNING, onSyncedIsRunning);
    socket.on(SOCKET_TIMER_EVENTS.SYNC_STARTED_AT, onSyncedStartedAt);
    socket.on(SOCKET_TIMER_EVENTS.SYNC_CURRENT_CYCLES, onSyncedCurrentCycles);
    socket.on(
      SOCKET_TIMER_EVENTS.SYNC_ALL_PARTICIPANTS,
      onSyncedAllParticipants
    );

    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    syncedIsRunning,
    syncedAllParticipants,
    syncedCurrentCycles,
    syncedStartedAt,
    handleClickCyclesStartButton
  };
};

export default useEmitSocket;
