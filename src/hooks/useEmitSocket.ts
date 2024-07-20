import { ERROR_MESSAGE } from "@/constants/errorMessage";
import {
  SOCKET_CONNECTION,
  SOCKET_TIMER_EVENTS,
  SOCKET_URL
} from "@/constants/socket";
import useInitialize from "@/hooks/useInitialize";
import { errorResponse } from "@/models/error.model";
import { IParticipant } from "@/models/roomDetail.model";
import { ServerTime } from "@/utils/serverTime";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Socket, io } from "socket.io-client";

const useEmitSocket = () => {
  const navigate = useNavigate();
  const { userInitializeAuth } = useInitialize();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [syncedIsRunning, setSyncedIsRunning] = useState<boolean | null>(null);
  const [syncedStartedAt, setSyncedStartedAt] = useState<string | null>(null);
  const [syncedCurrentCycles, setSyncedCurrentCycles] = useState<number | null>(null);
  const [syncedAllLinkeduserIds, setSyncedAllLinkedUserIds] = useState<number[] | null>(null);
  const [syncedCurrentServerTime, setSyncedCurrentServerTime] = useState<ServerTime | null>(null);
  const [syncedAllParticipants, setSyncedAllParticipants] = useState<
    IParticipant[] | null
  >(null);
  const [syncedTimeError, setSyncedTimeError] = useState<any>(null);

  const handleClickCyclesStartButton = () => {
    if (!socket) return;
    socket.emit(SOCKET_TIMER_EVENTS.START_CYCLES);
  };

  const handleClickRoomDeleteButton = () => {
    if (!socket) return;
    socket.emit(SOCKET_TIMER_EVENTS.DELETE_ROOM);
  };

  const clearSyncedData = () => {
    setSyncedStartedAt(null);
    setSyncedCurrentCycles(null);
    setSyncedTimeError(null);
  };

  useEffect(() => {
    const roomId = location.pathname.match(/\/rooms\/(\d+)/)![1];
    const socket = io(`${SOCKET_URL}${roomId}`, {
      withCredentials: true
    });

    socket.on(SOCKET_CONNECTION.CONNECT, () => {
      toast.success("성공적으로 방에 입장하셨습니다.");
    });

    socket.on(SOCKET_CONNECTION.CONNECT_ERROR, (error) => {
      toast.error("방 입장에 잠시 오류가 생겼습니다", error);
    });

    socket.on(SOCKET_CONNECTION.DISCONNECT, () => {});

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

    const onSyncedAllLinkedUserIds = (allLinkedUserIds : number[]) => {
      setSyncedAllLinkedUserIds(allLinkedUserIds);
    }

    const onSyncedCurrentServerTime = (currentServerTime : Date) => {
      const serverTime = new ServerTime(currentServerTime);
      setSyncedCurrentServerTime(serverTime);
    }

    const onSyncedTimeError = (error: errorResponse) => {
      toast.error(error.message);
    };
    const onSyncedRoomDeleted = () => {
      toast.error("방이 삭제되었습니다");
      navigate("/");
    };
    const onRequestedAuthenticate = () => {
      userInitializeAuth();
    };
    const onAuthError = () => {
      userInitializeAuth();
      toast.error(ERROR_MESSAGE['401']);
    };
    socket.on(SOCKET_TIMER_EVENTS.SYNC_IS_RUNNING, onSyncedIsRunning);
    socket.on(SOCKET_TIMER_EVENTS.SYNC_STARTED_AT, onSyncedStartedAt);
    socket.on(SOCKET_TIMER_EVENTS.SYNC_CURRENT_CYCLES, onSyncedCurrentCycles);
    socket.on(SOCKET_TIMER_EVENTS.SYNC_ALL_PARTICIPANTS,onSyncedAllParticipants);
    socket.on(SOCKET_TIMER_EVENTS.SYNC_ROOM_DELETED, onSyncedRoomDeleted);
    socket.on(SOCKET_TIMER_EVENTS.ERROR, onSyncedTimeError);
    socket.on(SOCKET_TIMER_EVENTS.SYNC_ALL_LINKED_USERS, onSyncedAllLinkedUserIds);
    socket.on(SOCKET_TIMER_EVENTS.SYNC_CURRENT_SERVER_TIME, onSyncedCurrentServerTime);
    socket.on(SOCKET_TIMER_EVENTS.REQUEST_AUTH, onRequestedAuthenticate);
    socket.on(SOCKET_TIMER_EVENTS.AUTH_ERROR, onAuthError);

    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    syncedIsRunning,
    syncedAllParticipants,
    syncedCurrentCycles,
    syncedStartedAt,
    syncedTimeError,
    syncedAllLinkeduserIds,
    syncedCurrentServerTime,
    handleClickCyclesStartButton,
    handleClickRoomDeleteButton,
    clearSyncedData
  };
};

export default useEmitSocket;
