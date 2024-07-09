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
  
  