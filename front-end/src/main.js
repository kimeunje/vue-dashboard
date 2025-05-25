import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 전역 스타일 imports
import './styles/globals.css'
import './styles/header.css'
import './styles/sidebar.css'
import './styles/dashboard.css'
import './styles/login.css'
import './styles/login-email.css'

// Vue 앱 생성
const app = createApp(App)

// 라우터 사용
app.use(router)

// 전역 에러 핸들러
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue error:', err)
  console.error('Error info:', info)
  console.error('Component:', vm)
}

// 전역 경고 핸들러 (개발 모드에서만)
if (import.meta.env.DEV) {
  app.config.warnHandler = (msg, vm, trace) => {
    console.warn('Vue warning:', msg)
    console.warn('Component trace:', trace)
  }
}

// 전역 속성 등록 (필요한 경우)
app.config.globalProperties.$formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('ko-KR')
}

// 앱 마운트
app.mount('#app')

// 개발 모드에서 Vue DevTools 활성화
if (import.meta.env.DEV) {
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__ && window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue.version
}
