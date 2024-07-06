import { IroomListData } from "../models/room.model";
import { requestHandler } from "./apiClient";

export const fetchRooms = async (page: string = "1", isRunningChecked?: boolean, roomType : string = "all") => {
    let num = parseInt(page);
    let url = `rooms`;
    if(roomType === "myRoom") url += `/my-rooms`
    url += `?page=${num}`
    
    if (isRunningChecked !== undefined && !isRunningChecked) {
        url += `&is_running=${isRunningChecked}`;
    }

    console.log(url);
    
    return await requestHandler<IroomListData>("get", url);
}