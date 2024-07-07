import { setupWorker } from "msw/browser";
import { mock_fetchRooms } from "./rooms";
const handlers = [mock_fetchRooms];

export const worker = setupWorker(...handlers);