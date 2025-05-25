<template>
  <header class="header" id="header">
    <router-link :to="linkPath" class="logo-container">
      <svg width="24" height="24" fill="white" viewBox="0 0 16 16">
        <path
          d="M8 0a8 8 0 0 0-2.916 15.462c-.074-.534-.144-1.343.03-1.918.159-.533.528-1.707.528-1.707s-.135-.271-.135-.674c0-.631.366-1.102.819-1.102.386 0 .573.29.573.636 0 .388-.246.973-.375 1.515-.107.452.224.816.67.816.805 0 1.347-.847 1.347-1.85 0-.969-.654-1.693-1.846-1.693-1.347 0-2.185 1.007-2.185 2.133 0 .388.129.663.332.872.035.044.078.126.063.158-.066.252-.214.796-.243.907-.35.135-.185.055-.421-.144-.593-.659-.859-1.537-.859-2.401 0-2.028 1.714-4.464 5.106-4.464 2.724 0 4.508 1.97 4.508 4.089 0 2.803-1.56 4.897-3.858 4.897-.771 0-1.5-.418-1.752-.894 0 0-.416 1.65-.507 1.97-.152.553-.501 1.11-.802 1.55 1.009.293 2.077.336 3.144.068 1.068-.285 2.062-.794 2.902-1.493a8 8 0 0 0-1.066-15.789z"
        />
      </svg>
      <div class="logo">{{ logoText }}</div>
    </router-link>

    <div class="search-bar">
      <svg width="16" height="16" fill="white" viewBox="0 0 16 16">
        <path
          d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
        />
      </svg>
      <input type="text" placeholder="Search" />
    </div>

    <div class="user-controls">
      <div v-if="loading" class="loading-indicator">로딩 중...</div>
      <div v-else-if="user" class="user-menu">
        <div class="user-info">
          <span class="user-name">{{ user.name }}</span>
          <span class="user-role">
            {{ user.role === 'admin' ? '관리자' : '사용자' }}
          </span>
        </div>
        <button @click="handleLogout" class="logout-button">로그아웃</button>
      </div>
      <router-link v-else to="/login" class="login-link"> 로그인 </router-link>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const route = useRoute()
const { user, loading, logout } = useAuth()

const scrolled = ref(false)

// 현재 경로에 따른 페이지 제목 설정
const getPageTitle = () => {
  // 기본 경로 매핑
  const routes = [
    { path: '/', title: '상시보안감사' },
    { path: '/security-audit', title: '상시보안감사' },
    { path: '/login', title: '로그인' },
  ]

  // 현재 경로가 어떤 기본 경로로 시작하는지 확인
  const matchedRoute = routes.find(
    (routeItem) =>
      route.path === routeItem.path || // 정확히 일치하거나
      (route.path.startsWith(routeItem.path) && routeItem.path !== '/'), // 해당 경로로 시작하는 경우 (홈 제외)
  )

  return matchedRoute ? matchedRoute.title : '나이스디앤비'
}

// 현재 경로에 따른 링크 경로 결정
const linkPath = computed(() => {
  // 스크롤되지 않았거나, 현재 경로가 홈인 경우 항상 홈으로 이동
  if (!scrolled.value || route.path === '/') {
    return '/'
  }

  // 스크롤된 상태에서는 현재 경로를 유지
  return route.path
})

// 로고 텍스트 계산
const logoText = computed(() => {
  return scrolled.value ? getPageTitle() : '나이스디앤비'
})

// 스크롤 이벤트 처리
const handleScroll = () => {
  // 스크롤 위치가 50px을 넘으면 scrolled 상태를 true로 설정
  if (window.scrollY > 50) {
    scrolled.value = true
  } else {
    scrolled.value = false
  }
}

// 로그아웃 처리 함수
const handleLogout = (e) => {
  e.preventDefault()
  logout()
}

onMounted(() => {
  // 스크롤 이벤트 리스너 등록
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  // 컴포넌트 언마운트 시 이벤트 리스너 제거
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header {
  background-color: #4355b9;
  color: white;
  padding: 15px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  flex-shrink: 0;
  position: sticky;
  transition: all 0.3s ease;
  top: 0;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 로고 컨테이너 호버 효과 */
.logo-container {
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

.logo-container:hover {
  opacity: 0.9;
  transform: scale(1.02);
}

/* 로고 텍스트 스타일 */
.logo {
  font-size: 1.5rem;
  margin-left: 10px;
  font-weight: bold;
  transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-bar {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 8px 15px;
  width: 250px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.search-bar:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.search-bar input {
  background: transparent;
  border: none;
  outline: none;
  color: white;
  width: 100%;
  padding-left: 10px;
}

.search-bar input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

/* 사용자 컨트롤 스타일 */
.user-controls {
  display: flex;
  align-items: center;
}

.loading-indicator {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.user-name {
  color: white;
  font-size: 14px;
  font-weight: 500;
}

.user-role {
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
}

.logout-button {
  background-color: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.login-link {
  color: white;
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 6px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.login-link:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
