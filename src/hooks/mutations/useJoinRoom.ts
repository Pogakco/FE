import { joinRoom } from "@/api/roomList.api";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

const useJoinRoom = (roomId: number): UseMutationResult<any, Error, void, unknown> => {

  return useMutation({
    mutationFn: () => joinRoom(roomId),
    onSuccess: (data) => {
        if(data.status===204) console.log('성공')
        }
  });
};

export default useJoinRoom;
