<template>
  <div>
    <h1 class="page-title">보안 감사 조치방법</h1>

    <div class="section">
      <h2 class="section-title">조치방법 개요</h2>
      <p>
        이 페이지에서는 정보보안 감사에서 확인해야 할 주요 항목에 대한 조치방법을 안내합니다. 모든
        가이드는 조직의 보안 정책을 준수하기 위한 기본적인 설정 방법과 점검 사항을 제공합니다.
      </p>
    </div>

    <div class="section">
      <h2 class="section-title">항목별 상세 가이드</h2>
      <div class="solutions-grid">
        <router-link
          v-for="(item, index) in solutionItems"
          :key="index"
          :to="item.path"
          class="solution-card"
        >
          <h3 class="solution-title">{{ item.title }}</h3>
          <p class="solution-description">{{ item.description }}</p>
        </router-link>
      </div>
    </div>

    <!-- 공통 페이지 네비게이션 컴포넌트 사용 -->
    <PageNavigation :currentPath="$route.path" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import PageNavigation from '@/components/PageNavigation.vue'

const route = useRoute()

const solutionItems = [
  {
    title: '화면보호기 사용',
    path: '/security-audit/solutions/screen-saver',
    description: '화면보호기 10분 이내 설정 및 암호화 적용',
  },
  {
    title: '이동매체 자동실행 제한',
    path: '/security-audit/solutions/auto-run',
    description: 'USB 및 외부 저장장치 자동실행 기능 비활성화',
  },
  {
    title: '백신 상태 확인',
    path: '/security-audit/solutions/antivirus',
    description: '바이러스 백신 설치, 실시간 보호, 최신 업데이트 확인',
  },
  {
    title: '패스워드 길이 및 복잡도',
    path: '/security-audit/solutions/password-policy',
    description: '8자 이상 강력한 패스워드 정책 적용 및 정기적 변경',
  },
  {
    title: '공유폴더 확인',
    path: '/security-audit/solutions/shared-folder',
    description: '불필요한 공유폴더 제거 및 접근 권한 관리',
  },
  {
    title: '원격데스크톱 제한',
    path: '/security-audit/solutions/remote-desktop',
    description: '원격 접속 비활성화 또는 승인된 사용자로 제한',
  },
  {
    title: '방화벽 활성화 확인',
    path: '/security-audit/solutions/firewall',
    description: '모든 네트워크 프로필에 방화벽 적용 상태 점검',
  },
]
</script>

<style scoped>
.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--dark-blue);
  margin-bottom: 2rem;
}

.section {
  background: white;
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--dark-blue);
  margin-bottom: 1rem;
}

.section p {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--dark-gray);
  margin-bottom: 1rem;
}

.section p:last-child {
  margin-bottom: 0;
}

.solutions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 15px;
}

.solution-card {
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 20px;
  background-color: #f9f9f9;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  cursor: pointer;
  height: 100%;
  box-sizing: border-box;
  text-decoration: none;
  color: inherit;
  display: block;
}

.solution-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.solution-title {
  margin-top: 0;
  margin-bottom: 0.75rem;
  color: var(--primary-color);
  font-size: 1.1rem;
  font-weight: 600;
}

.solution-description {
  font-size: 0.9rem;
  color: var(--dark-gray);
  margin: 0;
  line-height: 1.5;
}
</style>
