export const SOCKET_URL = process.env.NODE_ENV === "development" ?
`http://localhost:3000/rooms/` : undefined 

export const SOCKET_DEFAULT_EVENTS = {
    CONNECTION: "connection",
    DISCONNECT: "disconnect",
  };

export const SOCKET_TIMER_EVENTS = {
    START_CYCLES: "start-cycles",
    SYNC_STARTED_AT: "sync-started-at",
    SYNC_IS_RUNNING: "sync-is-running",
    SYNC_ALL_PARTICIPANTS: "sync-all-participants",
    SYNC_CURRENT_CYCLES: "sync-cu rrent-cycles",
    ERROR: "timer-error",
};

export const SOCKET_TIMER_STATUS = {
    SHORT_BREAK_TIME : "shortBreakTime",
    SET : "set",
    LONG_BREAK_TIME : "longBreakTime",
    FOCUS_TIME : "focusTime",
    END_POINT : -9999,
}