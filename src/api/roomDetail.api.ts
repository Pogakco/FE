import { IroomData } from "@/models/room.model";
import { requestHandler } from "./apiClient";

export const fetchRoomDetail = async (id: string) => {
    const url = `/rooms/${id}`
    return await requestHandler<IroomData>("get", url);
}

export const exitRoom = async (id : string) => {
    const url =`/rooms/${id}/leave`
    return await requestHandler<void>("delete", url)
}