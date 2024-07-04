import { IroomListData } from "../models/room.model";
import { requestHandler } from "./apiClient";

export const fetchRooms = async (page : string = "1" )  => {
    let num = Number(page);
    return await requestHandler<IroomListData>("get", `/rooms?page=${num}`);
}