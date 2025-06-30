import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 외부에서도 접속 가능하도록 설정
    port: 4485,      // 포트도 명시해두는 걸 권장
  },
})