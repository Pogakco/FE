import { ServerTime } from "./serverTime";

export const getDifferentTime = (
  serverStartTime: string,
  syncedCurrentServerTime: ServerTime | null
): number => {
  let now;
  if (syncedCurrentServerTime === null) {
    now = new Date();
  } else {
    now = syncedCurrentServerTime.getServerDate();
  }
  const startDate = new Date(serverStartTime);
  const timeDifferenceInMillis = now.getTime() - startDate.getTime();
  const timeDifferenceInSeconds = Math.round(timeDifferenceInMillis / 1000);
  return timeDifferenceInSeconds;
};
