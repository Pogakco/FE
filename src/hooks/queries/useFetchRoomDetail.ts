import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IroomData } from '@/models/room.model';
import { fetchRoomDetail } from "@/api/roomDetail.api";

const useFetchRoomDetail = (id : string | undefined) : UseQueryResult<IroomData, Error> => {
    return useQuery<IroomData, Error>({
        queryKey: [`rooms/detail`],
        queryFn: () => fetchRoomDetail(id!),
        enabled: !!id,
        throwOnError: true
    })
}

export default useFetchRoomDetail;
