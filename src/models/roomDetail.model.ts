export interface IParticipant {
    id? :number;
    joinDate? : Date;
    roomId? : number;
    userId? : number;
    nickname: string;
    profileImageUrl?: string;
    pomodoroCount: number;
    isActive: boolean;
  }
  
  export interface IRoomUserData {
      activeParticipants: number;
      users: IParticipant[]
  }
  
  