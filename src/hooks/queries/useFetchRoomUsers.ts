import { fetchRoomUsers } from '@/api/roomDetail.api'
import { IRoomUserData } from '@/models/roomDetail.model'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

const useFetchRoomUsers = (id : string | undefined) : UseQueryResult<IRoomUserData, Error> => {
  return useQuery<IRoomUserData, Error>({
    queryKey: ['rooms/users'],
    queryFn: () => fetchRoomUsers(id!),
    enabled: !!id 
  })
}

export default useFetchRoomUsers