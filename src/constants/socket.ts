export const SOCKET_URL = '/rooms/'

export const SOCKET_DEFAULT_EVENTS = {
    CONNECTION: "connection",
    DISCONNECT: "disconnect",
  };

export const SOCKET_TIMER_EVENTS = {
    START_CYCLES: "start-cycles",
    SYNC_STARTED_AT: "sync-started-at",
    SYNC_IS_RUNNING: "sync-is-running",
    SYNC_ALL_PARTICIPANTS: "sync-all-participants",
    SYNC_CURRENT_CYCLES: "sync-current-cycles",
    SYNC_ROOM_DELETED: "room-deleted",
    SYNC_ALL_LINKED_USERS : "sync-all-linked-user-ids",
    SYNC_CURRENT_SERVER_TIME : "sync-current-server-time",
    DELETE_ROOM: "delete-room",
    ERROR: "timer-error",
    REQUEST_AUTH: "request-auth",
    AUTH_ERROR: "auth-error",
};

export const SOCKET_TIMER_STATUS = {
    SHORT_BREAK_TIME : "shortBreakTime",
    SET : "set",
    END : "end",
    LONG_BREAK_TIME : "longBreakTime",
    FOCUS_TIME : "focusTime",
    END_POINT : -9999999,
}

export const SOCKET_CONNECTION = {
    CONNECT : "connect",
    CONNECT_ERROR : "connect_error",
    DISCONNECT : "disconnect"
}

export const SECOND_MS = 1;
export const MINUTE_MS = 60 * SECOND_MS;
export const IS_DEV_MODE = process.env.NODE_ENV === 'development';
