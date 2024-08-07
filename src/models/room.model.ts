export interface IroomData {
  id: number;
  roomTitle: string;
  roomDescription: string;
  totalCycles: number;
  currentCycles: number;
  focusTime: number;
  startedAt: string;
  shortBreakTime: number;
  isJoined? : boolean;
  longBreakTime: number;
  isRunning: boolean;
  maxParticipants: number;
  currentParticipants: number;
  ownerName: string;
  ownerProfileImageUrl?: string;
}

export interface IroomListData {
  data: IroomCardData[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    limit: number;
  };
}

export type IroomCardData = Omit<IroomData, "startedAt">;

export interface IcreateRoomForm {
  roomTitle: string;
  roomDescription: string;
  focusTime: string | number;
  shortBreakTime: string | number;
  longBreakTime: string | number;
  totalCycles: string | number;
  maxParticipants: string | number;
}

export type TRoomType = "all" | "myRoom";