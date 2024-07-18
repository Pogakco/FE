import { IS_DEV_MODE, MINUTE_MS, SECOND_MS } from "@/constants/socket";
import { IcreateRoomForm, IroomData } from "@/models/room.model";
import { TtimerStatus } from "@/models/timer.model";
import { DefaultTheme } from "styled-components";

const TIME_UNIT = IS_DEV_MODE? SECOND_MS : MINUTE_MS;

export const percent = (
  status: TtimerStatus,
  current: number,
  roomData: IroomData
) => {
  let total;
  switch (status) {
    case "focusTime":
      total = roomData.focusTime * TIME_UNIT;
      return ((total - current + 1) / total) * 100;
    case "shortBreakTime":
      total = roomData.shortBreakTime * TIME_UNIT;
      return 100 - ((total - current + 1) / total) * 100;
    case "longBreakTime":
      total = roomData.longBreakTime * TIME_UNIT;
      return ((total - current + 1) / total) * 100;
    default:
      return 0;
  }
};

export const getColorByStatus = (status: TtimerStatus, theme: DefaultTheme) => {
  switch (status) {
    case "focusTime":
      return {
        main: theme.color.pink6,
        trail: theme.color.pink1
      };

    case "shortBreakTime":
      return {
        main: theme.color.pink4,
        trail: theme.color.pink1
      };
    case "longBreakTime":
      return {
        main: theme.color.grey3,
        trail: theme.color.grey1
      };

    default:
      return {
        main: theme.color.grey2,
        trail: theme.color.grey1
      };
  }
};

export const getMessageByStatus = (status: TtimerStatus) => {
  switch (status) {
    case "focusTime":
      return "지금은 집중 시간입니다";
    case "shortBreakTime":
      return "지금은 휴식 시간입니다";
    case "longBreakTime":
      return "타이머가 곧 종료됩니다";
    default:
      return "시작버튼을 눌러주세요";
  }
};

export const getDefaultValue = (key: keyof IcreateRoomForm) => {
  const defaultValues: Record<keyof IcreateRoomForm, string> = {
    roomTitle: "",
    roomDescription: "",
    focusTime: "25",
    shortBreakTime: "5",
    longBreakTime: "30",
    totalCycles: "2",
    maxParticipants: "10"
  };

  return defaultValues[key];
};
