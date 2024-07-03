import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    // Proxy 설정
    proxy: {
      // api로 시작하는 모든 api
      "/api": {
        // 서버 base 주소
        target: "http://localhost:3000",
        // target으로 변경
        changeOrigin: true,
        // 요청 경로에서 '/api' 제거
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
});
