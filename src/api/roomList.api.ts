import { IroomListData } from "../models/room.model";
import { requestHandler } from "./apiClient";

export const fetchRooms = async (page: string = "1", isRunningChecked?: boolean) => {
    let num = Number(page);
    let url = `/rooms?page=${num}`;
    
    if (isRunningChecked !== undefined && !isRunningChecked) {
        console.log(isRunningChecked)
        url += `&is_running=${isRunningChecked}`;
    }
    
    return await requestHandler<IroomListData>("get", url);
}

// 참여 방 조회 API