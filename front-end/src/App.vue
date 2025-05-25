<template>
  <div id="app">
    <!-- 헤더 컴포넌트 -->
    <Header />

    <!-- 네비게이션 컴포넌트 -->
    <Navigation />

    <!-- 메인 콘텐츠 영역 -->
    <main class="main-content">
      <!-- 라우터 뷰 - 현재 페이지 컴포넌트가 렌더링됩니다 -->
      <router-view v-slot="{ Component, route }">
        <!-- 페이지 전환 애니메이션 (선택적) -->
        <transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Header from '@/components/Header.vue'
import Navigation from '@/components/Navigation.vue'
import { useAuth } from '@/composables/useAuth'

// 인증 상태 초기화
const { loadUserInfo } = useAuth()

// 앱 마운트 시 사용자 정보 로드
onMounted(() => {
  // useAuth composable에서 이미 onMounted로 처리하므로
  // 여기서는 추가 초기화 작업만 수행
  console.log('App mounted')
})
</script>

<style>
/* 전역 스타일 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #f8f9fa;
  color: #333;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 페이지 전환 애니메이션 */
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .main-content {
    padding: 0 10px;
  }
}

/* 스크롤바 스타일링 (Webkit 기반 브라우저) */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 포커스 아웃라인 스타일 */
*:focus {
  outline: 2px solid #4056b9;
  outline-offset: 2px;
}

/* 버튼 기본 스타일 초기화 */
button {
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
}

/* 링크 기본 스타일 */
a {
  color: inherit;
  text-decoration: none;
}

/* 리스트 기본 스타일 초기화 */
ul,
ol {
  list-style: none;
}

/* 이미지 반응형 */
img {
  max-width: 100%;
  height: auto;
}
</style>
