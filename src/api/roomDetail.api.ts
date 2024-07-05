import { IroomData } from "@/models/room.model";
import { requestHandler } from "./apiClient";

export const fetchRoomDetail = async (id: string) => {
    const url = `/rooms/${id}`
    return await requestHandler<IroomData>("get", url);

}