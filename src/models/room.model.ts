export interface IroomListData {
    data: {
        id: number
      roomTitle: string,
      roomDescription: string,
      totalCycles: number,
      currentCycles: number,
      focusTime: number,
      shortBreakTime: number,
      longBreakTime: number,
      isRunning: boolean,
        maxParticipants: number,
      currentParticipants: number,
      ownerName: string,
      ownerProfileImageUrl?: string,
    }[],
    pagination: {
      currentPage: number,
      totalPages: number,
      totalElements: number,
      limit: number,
    }
  }

export interface IroomData {
    id : number;
    roomTitle: string;
    roomDescription: string;
    totalCycles: number;
    currentCycles: number;
    focusTime: number;
    startedAt: string, // 타이머 시작 시각
    shortBreakTime: number;
    longBreakTime: number;
    isRunning: boolean;
	  maxParticipants: number; // 방에 수용 가능한 최대 인원 수
    currentParticipants: number; // 방에 참여한(활성/비활성 모두) 인원 수
    ownerName: string;
    ownerProfileImageUrl?: string;
}

export type IroomCardData = Omit<IroomData, "startedAt"> 

export interface IactiveUserData {
    activeParticipants: number; // 방에 참여한 사이클을 진행중인(활성) 인원 수
    users: {
      nickname: string;
      profileImageUrl?: string;
      pomodoroCount: number;
      isActive: boolean;
    }[]
}

export interface IParticipant {
    nickname: string;
    profileImageUrl?: string;
    pomodoroCount: number;
    isActive: boolean;
  }
