export interface IroomData {
    roomTitle: string;
    roomDescription: string;
    totalCycles: number;
    currentCycles: number;
    focusTime: number;
    shortBreakTime: number;
    longBreakTime: number;
    isRunning: boolean;
	maxParticipants: number; // 방에 수용 가능한 최대 인원 수
    currentParticipants: number; // 방에 참여한(활성/비활성 모두) 인원 수
    ownerName: string;
    ownerProfileImageUrl?: string;
}