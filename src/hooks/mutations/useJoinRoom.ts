import { joinRoom } from "@/api/roomList.api";
import { errorResponse } from "@/models/error.model";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

const useJoinRoom = (
  roomId: number
): UseMutationResult<any, Error, void, unknown> => {
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  return useMutation({
    mutationFn: () => joinRoom(roomId),
    onSuccess: () => {
      navigate(`/rooms/${roomId}`, { state: { mode: "participant" } });
    },
    onError: (error: AxiosError<errorResponse>) => {
      if (error.response?.status === 401) showBoundary(error);
    }
  });
};

export default useJoinRoom;
