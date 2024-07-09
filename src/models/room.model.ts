export interface IroomData {
  id : number;
  roomTitle: string;
  roomDescription: string;
  totalCycles: number;
  currentCycles: number;
  focusTime: number;
  startedAt: string,
  shortBreakTime: number;
  longBreakTime: number;
  isRunning: boolean;
  maxParticipants: number;
  currentParticipants: number;
  ownerName: string;
  ownerProfileImageUrl?: string;
}

export interface IroomListData {
    data: IroomCardData[],
    pagination: {
      currentPage: number,
      totalPages: number,
      totalElements: number,
      limit: number,
    }
  }

export type IroomCardData = Omit<IroomData, "startedAt"> 

export interface IcreateRoomForm {
  roomTitle: string;
  roomDescription: string;
  focusTime: string;
  shortBreakTime: string;
  longBreakTime: string;
  totalCycles: string;
  maxParticipants: string;
}

export type TRoomType = "all" | "myRoom";

export interface IParticipant {
  nickname: string;
  profileImageUrl?: string;
  pomodoroCount: number;
  isActive: boolean;
}

export interface IactiveUserData {
    activeParticipants: number;
    users: IParticipant[]
}



