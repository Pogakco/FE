import { setupWorker } from "msw/browser";
import { fetchMyRooms, fetchRooms } from "./rooms";
const handlers = [];

// export const worker = setupWorker(...handlers);