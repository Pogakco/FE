import { IroomData } from "@/models/room.model";
import { requestHandler } from "./apiClient";
import { IRoomUserData } from "@/models/roomDetail.model";

export const fetchRoomDetail = async (id: string) => {
    const url = `/rooms/${id}`
    return await requestHandler<IroomData>("get", url);
}

export const fetchRoomUsers = async (id : string) => {
    const url = `/rooms/${id}/users`
    return await requestHandler<IRoomUserData>("get", url)
}

export const exitRoom = async (id : string) => {
    const url =`/rooms/${id}/leave`
    return await requestHandler<void>("delete", url)
}

export const deleteRoom = async (id : string) => {
    const url =`/rooms/${id}`
    return await requestHandler<void>("delete", url);
}