import { exitRoom } from "@/api/roomDetail.api";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useExitRoom = (
    roomId: string | undefined
): UseMutationResult<any, Error, void, unknown> => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => {
            if (!roomId) {
                return Promise.reject(new Error('유효하지 않은 방 ID입니다.'));
            }
            return exitRoom(roomId);
        },
        onSuccess: () => {
            toast.success('그룹을 떠나셨습니다.');
            queryClient.invalidateQueries({ queryKey: ['rooms'] });
            navigate(`/`);
        },
        onError: (error: AxiosError | Error) => {
            const message = error instanceof AxiosError 
                ? error.response?.data?.message || '에러가 발생하였습니다'
                : error.message;
            toast.error(message);
        }
    });
}

export default useExitRoom;