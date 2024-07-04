import { IroomListData } from "../models/room.model";
import { requestHandler } from "./apiClient";

export const fetchRooms = async (page : string = "1", isRunningChecked : boolean = false)  => {
    let num = Number(page);
    return await requestHandler<IroomListData>("get", `/rooms?page=${num}?is_running=${isRunningChecked}`);
}