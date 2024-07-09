import { IcreateRoomForm } from "@/models/room.model";

export const getFromSession = (key : string) : string => {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : undefined;
}

export const saveToSession = (key : string, value : string) => {
    sessionStorage.setItem(key, JSON.stringify(value));
}

export const deleteSession = (key: string) => {
    if (key === "deleteCreateRoomSession") {
  
      const fields = [
        "roomTitle",
        "roomDescription",
        "focusTime",
        "shortBreakTime",
        "longBreakTime",
        "totalCycles",
        "maxParticipants",
      ];
  
      fields.forEach((field) => {
        sessionStorage.removeItem(field); // 해당 필드의 세션 데이터 삭제
      });
    } else {
      console.error(`Unknown key: ${key}`);
    }
  };