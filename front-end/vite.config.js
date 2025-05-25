import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      // Vue 컴파일러 옵션
      template: {
        compilerOptions: {
          // 커스텀 엘리먼트 처리
          isCustomElement: (tag) => tag.startsWith('custom-')
        }
      }
    })
  ],

  // 경로 별칭 설정
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  // 개발 서버 설정
  server: {
    port: 3000,
    host: true, // 네트워크에서 접근 가능
    cors: true,
    proxy: {
      // API 프록시 설정 (백엔드가 다른 포트에서 실행되는 경우)
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        ws: true // WebSocket 지원
      }
    }
  },

  // 빌드 설정
  build: {
    outDir: 'dist',
    sourcemap: true, // 프로덕션에서도 소스맵 생성
    minify: 'esbuild',

    // 청크 분할 설정
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          charts: ['recharts'], // 차트 라이브러리 (필요시)
          utils: ['jszip'] // 유틸리티 라이브러리
        }
      }
    },

    // 빌드 타겟 설정
    target: ['es2015', 'chrome58', 'firefox57', 'safari11'],

    // 에셋 처리
    assetsDir: 'assets',
    assetsInlineLimit: 4096, // 4kb 이하 파일은 인라인으로 처리
  },

  // CSS 설정
  css: {
    devSourcemap: true, // 개발 모드에서 CSS 소스맵
    preprocessorOptions: {
      scss: {
        // SCSS 전역 변수 파일 자동 임포트 (필요시)
        // additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },

  // 환경 변수 설정
  define: {
    __VUE_OPTIONS_API__: true, // Options API 지원
    __VUE_PROD_DEVTOOLS__: false, // 프로덕션에서 DevTools 비활성화
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
  },

  // 최적화 설정
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'jszip'
    ],
    exclude: [
      // 번들링에서 제외할 패키지
    ]
  },

  // 미리보기 서버 설정 (vite preview)
  preview: {
    port: 4173,
    host: true
  },

  // ESBuild 설정
  esbuild: {
    // JSX 설정 (필요시)
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  }
})
