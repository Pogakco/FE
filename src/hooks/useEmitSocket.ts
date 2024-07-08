import { SOCKET_TIMER_EVENTS, SOCKET_URL } from '@/constants/socket';
import { IParticipant } from '@/models/room.model';
import { useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client';

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
      console.log(SOCKET_URL)
      const socket = io(`http://localhost:3000/rooms/${roomId}`, {
        withCredentials: true,
      });
      setSocket(socket);
      console.log(socket)

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
      socket.on(SOCKET_TIMER_EVENTS.SYNC_ALL_PARTICIPANTS, onSyncedAllParticipants);

      return () => {
        socket.disconnect();
      };
    }, []);

    return {syncedIsRunning, syncedAllParticipants, syncedCurrentCycles, syncedStartedAt, handleClickCyclesStartButton}
}

export default useEmitSocket