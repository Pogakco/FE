import { IParticipant } from "@/models/roomDetail.model";

export const getUserRankList = (syncedAllParticipants: IParticipant[] | null, syncedAllLinkeduserIds: number[] | null): IParticipant[] | null => {
    console.log(syncedAllLinkeduserIds, syncedAllParticipants)
    if (syncedAllParticipants === null || syncedAllLinkeduserIds === null) return null;
    return syncedAllParticipants
        .map((user) => ({
            ...user,
            isCurrentParticipant: syncedAllLinkeduserIds.includes(user.userId)
        }));
};
