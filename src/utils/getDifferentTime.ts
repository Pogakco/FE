export const getDifferentTime = (serverStartTime: string) : number => {
    const startDate = new Date(serverStartTime);
    const now = new Date();
    const timeDifferenceInMillis = now.getTime() - startDate.getTime();
    const timeDifferenceInSeconds = Math.round(timeDifferenceInMillis / 1000);

    return timeDifferenceInSeconds;
}