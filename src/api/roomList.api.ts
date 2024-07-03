import { IroomListData } from "@/models/room.model";
import { requestHandler } from "./apiClient";

export const fetchRooms = async () => {
    return await requestHandler<IroomListData>("get", `/rooms`);
}