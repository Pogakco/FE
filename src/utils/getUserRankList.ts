import { IParticipant } from "@/models/roomDetail.model";

export const getUserRankList = (syncedAllParticipants: IParticipant[] | null, syncedAllLinkeduserIds: number[] | null): IParticipant[] | null => {
    if (syncedAllParticipants === null || syncedAllLinkeduserIds === null) return null;
    return syncedAllParticipants
        .sort((a, b) => b.pomodoroCount - a.pomodoroCount)
        .map((user) => ({
            ...user,
            isCurrentParticipant: syncedAllLinkeduserIds.includes(user.userId)
        }));
};
