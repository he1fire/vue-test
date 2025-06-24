import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "/vue-test/",
  server: {
    proxy: {
      '/api': {  // 프론트엔드에서 /api로 시작하는 요청을 프록시
        target: 'https://boardgamegeek.com', // 실제 요청을 보낼 서버 주소
        changeOrigin: true, // 도메인을 변경
        rewrite: (path) => path.replace(/^\/api/, ''), // 필요시 /api를 제거
      }
    }
  }
})
