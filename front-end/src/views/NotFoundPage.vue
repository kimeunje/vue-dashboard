<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <!-- 404 아이콘 -->
      <div class="error-icon">
        <svg width="120" height="120" fill="currentColor" viewBox="0 0 16 16">
          <path
            d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"
          />
          <path
            d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"
          />
        </svg>
      </div>

      <!-- 에러 메시지 -->
      <h1 class="error-title">404</h1>
      <h2 class="error-subtitle">페이지를 찾을 수 없습니다</h2>
      <p class="error-description">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        <br />
        URL을 다시 확인하시거나 아래 버튼을 통해 홈페이지로 돌아가세요.
      </p>

      <!-- 액션 버튼들 -->
      <div class="error-actions">
        <router-link to="/" class="btn btn-primary"> 🏠 홈으로 돌아가기 </router-link>
        <button @click="goBack" class="btn btn-secondary">← 이전 페이지</button>
        <router-link to="/security-audit" class="btn btn-secondary"> 📋 보안감사 메뉴 </router-link>
      </div>

      <!-- 도움말 섹션 -->
      <div class="help-section">
        <h3 class="help-title">도움이 필요하신가요?</h3>
        <p class="help-text">계속해서 문제가 발생하는 경우 IT 지원팀에 문의해주세요.</p>
        <div class="help-contacts">
          <span class="contact-item">📞 내선: 5678</span>
          <span class="contact-item">📧 이메일: support@example.com</span>
        </div>
      </div>

      <!-- 최근 페이지 링크 (선택적) -->
      <div class="recent-pages">
        <h4 class="recent-title">자주 방문하는 페이지</h4>
        <div class="recent-links">
          <router-link to="/security-audit/results" class="recent-link"> 검사결과 </router-link>
          <router-link to="/security-audit/solutions" class="recent-link"> 조치방법 </router-link>
          <router-link to="/security-audit/contact" class="recent-link"> 문의하기 </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 이전 페이지로 돌아가기
const goBack = () => {
  // 브라우저 히스토리가 있으면 뒤로가기, 없으면 홈으로
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.not-found-container {
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.not-found-content {
  text-align: center;
  max-width: 600px;
  background: white;
  border-radius: 16px;
  padding: 3rem 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
}

.error-icon {
  color: #ffc107;
  margin-bottom: 1.5rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.error-title {
  font-size: 4rem;
  font-weight: 800;
  color: var(--primary-color);
  margin: 0 0 0.5rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.error-subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--dark-blue);
  margin: 0 0 1rem 0;
}

.error-description {
  font-size: 1rem;
  color: var(--dark-gray);
  line-height: 1.6;
  margin: 0 0 2rem 0;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--dark-blue);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 86, 185, 0.3);
}

.btn-secondary {
  background-color: white;
  color: var(--dark-gray);
  border: 2px solid var(--border-color);
}

.btn-secondary:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-1px);
}

.help-section {
  border-top: 1px solid var(--border-color);
  padding-top: 2rem;
  margin-top: 2rem;
}

.help-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--dark-blue);
  margin: 0 0 0.5rem 0;
}

.help-text {
  font-size: 0.9rem;
  color: var(--dark-gray);
  margin: 0 0 1rem 0;
}

.help-contacts {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.contact-item {
  font-size: 0.85rem;
  color: var(--primary-color);
  font-weight: 500;
}

.recent-pages {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.recent-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--dark-blue);
  margin: 0 0 1rem 0;
}

.recent-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.recent-link {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--primary-color);
  border-radius: 20px;
  transition: all 0.2s ease;
}

.recent-link:hover {
  background-color: var(--primary-color);
  color: white;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .not-found-content {
    padding: 2rem 1.5rem;
    margin: 0 1rem;
  }

  .error-title {
    font-size: 3rem;
  }

  .error-subtitle {
    font-size: 1.25rem;
  }

  .error-actions {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 250px;
    justify-content: center;
  }

  .help-contacts {
    flex-direction: column;
    gap: 0.5rem;
  }

  .recent-links {
    flex-direction: column;
    align-items: center;
  }

  .recent-link {
    width: 100%;
    max-width: 200px;
    text-align: center;
  }
}

/* 애니메이션 효과 */
.not-found-content {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
