import { fetchRooms } from "@/api/roomList.api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IroomListData } from '@/models/room.model';

const useFetchRooms = (page : string, isRunningChecked : boolean): UseQueryResult<IroomListData, Error> => {
  return useQuery<IroomListData, Error>({
    queryKey: ['rooms'],
    queryFn: () => fetchRooms(page, isRunningChecked)
  });
};

export default useFetchRooms;
