import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";


export default defineConfig({

  plugins: [react(), svgr(), tailwindcss()],

    server: {
    proxy: {
      "/api": {
        target: "http://localhost:80", // 백엔드 서버 주소
        changeOrigin: true,
      },
    },
  },

});
