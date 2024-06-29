import { io } from "socket.io-client";

const URL =
  import.meta.env.MODE === "production" ? "/" : "http://localhost:5173";

export const socket = io(URL, {
  withCredentials: true, // 쿠키를 서버로 전달하기 위한 설정
});