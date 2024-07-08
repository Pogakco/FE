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
  focusTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  totalCycles: number;
  maxParticipants: number;
}