import { setupWorker } from "msw/browser";
import { fetchMyRooms, fetchRooms } from "./rooms";
const handlers = [fetchMyRooms];

export const worker = setupWorker(...handlers);