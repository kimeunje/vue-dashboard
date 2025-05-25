<template>
  <nav :class="['navigation', { hidden: isHidden }]">
    <ul class="nav-links">
      <li v-for="item in navItems" :key="item.path">
        <router-link :to="item.path">{{ item.name }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const navItems = [
  { name: 'Home', path: '/' },
  { name: '상시보안감사', path: '/security-audit' },
  { name: '웹사이트 허용 신청', path: '/website-allow' },
  { name: '대용량 메일 작성', path: '/mail' },
  { name: 'USB 반출 신청', path: '/usb-request' },
]

const isHidden = ref(false)
const lastScrollY = ref(0)

// 스크롤 이벤트 처리
const controlNavbar = () => {
  const currentScrollY = window.scrollY

  // 페이지 상단에 있을 때는 항상 네비게이션 표시
  if (currentScrollY <= 10) {
    isHidden.value = false
  }
  // 스크롤 방향 감지 (아래로 스크롤하면 숨김, 위로 스크롤하면 표시)
  else if (currentScrollY > lastScrollY.value + 10) {
    // 10px 이상 스크롤해야 반응
    isHidden.value = true
  } else if (currentScrollY < lastScrollY.value - 10) {
    isHidden.value = false
  }

  lastScrollY.value = currentScrollY
}

onMounted(() => {
  // 처음 로드 시 스크롤 위치 저장
  lastScrollY.value = window.scrollY

  // 스크롤 이벤트 리스너 등록
  window.addEventListener('scroll', controlNavbar)
})

onUnmounted(() => {
  // 컴포넌트 언마운트 시 이벤트 리스너 제거
  window.removeEventListener('scroll', controlNavbar)
})
</script>

<style scoped>
.navigation {
  background-color: #4355b9;
  padding: 0 40px;
  z-index: 990;
  flex-shrink: 0;
  transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
  height: 49px;
  overflow: hidden;
  position: relative;
  opacity: 1;
  width: 100%;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.navigation.hidden {
  height: 0;
  padding-top: 0;
  padding-bottom: 0;
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.nav-links {
  display: flex;
  list-style: none;
  transition:
    transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1),
    opacity 0.4s ease;
  margin: 0;
  padding: 0;
}

.navigation.hidden .nav-links {
  transform: translateY(-10px);
  opacity: 0;
}

.nav-links li a {
  color: white;
  text-decoration: none;
  padding: 15px 20px;
  display: block;
  transition: background-color 0.3s ease;
}

.nav-links li a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
