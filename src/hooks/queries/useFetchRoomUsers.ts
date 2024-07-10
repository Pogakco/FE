import { fetchRoomUsers } from '@/api/roomDetail.api'
import { IRoomUserData } from '@/models/roomDetail.model'
import { useQuery } from '@tanstack/react-query'

const useFetchRoomUsers = (id : number) => {
  return useQuery<IRoomUserData>({
    queryKey: ['rooms/users'],
    queryFn: () => fetchRoomUsers(id)
  })
}

export default useFetchRoomUsers