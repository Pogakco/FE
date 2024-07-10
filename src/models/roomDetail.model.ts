export interface IParticipant {
    nickname: string;
    profileImageUrl?: string;
    pomodoroCount: number;
    isActive: boolean;
  }
  
  export interface IRoomUserData {
      activeParticipants: number;
      users: IParticipant[]
  }
  
  