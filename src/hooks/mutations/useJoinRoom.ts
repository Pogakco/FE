import { joinRoom } from "@/api/roomList.api";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useJoinRoom = (
  roomId: number
): UseMutationResult<any, Error, void, unknown> => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => joinRoom(roomId),
    onSuccess: () => {
      navigate(`/rooms/${roomId}`)
    }
})
};

export default useJoinRoom
