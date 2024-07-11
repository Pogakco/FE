import { fetchRooms } from "@/api/roomList.api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IroomListData, TRoomType } from '@/models/room.model';

const useFetchRooms = (page : string, isRunningChecked : boolean, roomType : TRoomType): UseQueryResult<IroomListData, Error> => {
  return useQuery<IroomListData, Error>({
    queryKey: ['rooms'],
    queryFn: () => fetchRooms(page, isRunningChecked, roomType),
    enabled: true,
  });
};

export default useFetchRooms;
