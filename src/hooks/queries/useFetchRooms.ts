import { fetchRooms } from "@/api/roomList.api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IroomListData, TRoomType } from '@/models/room.model';


const useFetchRooms = (page : string, isRunningChecked : boolean, roomType : TRoomType): UseQueryResult<IroomListData> => {
  return useQuery<IroomListData>({
    queryKey: ['rooms', page, isRunningChecked, roomType],
    queryFn: () => fetchRooms(page, isRunningChecked, roomType),
    throwOnError: true,
    });
};

export default useFetchRooms;
