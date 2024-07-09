import { IcreateRoomForm } from "@/models/room.model";

export const getFromSession = (key : string) : string => {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : "";
}

export const saveToSession = (key : string, value : string) => {
    sessionStorage.setItem(key, JSON.stringify(value));
}
type RoomFormKeys = keyof IcreateRoomForm;

export const deleteSession = (key: string) => {
    if (key === "deleteCreateRoomSession") {
      const fields : RoomFormKeys[] = [
        "roomTitle",
        "roomDescription",
        "focusTime",
        "shortBreakTime",
        "longBreakTime",
        "totalCycles",
        "maxParticipants",
      ];
      fields.forEach((field) => {
        sessionStorage.removeItem(field);
      });
    }
  };