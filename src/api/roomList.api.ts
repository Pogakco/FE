import { IcreateRoomForm, IroomListData } from "../models/room.model";
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

export const createRoom = async (roomDatas: IcreateRoomForm) => {
    console.log(roomDatas)
    return await requestHandler("post", "rooms", {
        roomTitle: roomDatas.roomTitle,
        roomDescription: roomDatas.roomDescription,
        focusTime: Number(roomDatas.focusTime),
        shortBreakTime: Number(roomDatas.shortBreakTime),
        longBreakTime: Number(roomDatas.longBreakTime),
        totalCycles: Number(roomDatas.totalCycles),
        maxParticipants: Number(roomDatas.maxParticipants),
    });
}