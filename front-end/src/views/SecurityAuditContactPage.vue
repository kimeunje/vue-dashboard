<template>
  <div>
    <h1 class="page-title">문의하세요</h1>

    <div class="section">
      <h2 class="section-title">보안 감사 관련 문의</h2>
      <p>
        상시보안감사와 관련된 질문이나 도움이 필요하신 경우 아래 양식을 작성하여 문의해 주세요.
        담당자가 확인 후 빠르게 답변드리겠습니다.
      </p>
    </div>

    <div class="section">
      <h2 class="section-title">문의 양식</h2>

      <div
        v-if="submitResult.message"
        :class="['submit-result', submitResult.success ? 'success' : 'error']"
      >
        {{ submitResult.message }}
      </div>

      <form @submit="handleSubmit" class="contact-form">
        <div class="form-grid">
          <!-- 이름 -->
          <div class="form-field">
            <label for="name" class="form-label">이름 *</label>
            <input type="text" id="name" v-model="formData.name" required class="form-input" />
          </div>

          <!-- 부서 -->
          <div class="form-field">
            <label for="department" class="form-label">부서 *</label>
            <input
              type="text"
              id="department"
              v-model="formData.department"
              required
              class="form-input"
            />
          </div>

          <!-- 이메일 -->
          <div class="form-field">
            <label for="email" class="form-label">이메일 *</label>
            <input type="email" id="email" v-model="formData.email" required class="form-input" />
          </div>

          <!-- 전화번호 -->
          <div class="form-field">
            <label for="phone" class="form-label">전화번호 (내선)</label>
            <input type="tel" id="phone" v-model="formData.phone" class="form-input" />
          </div>

          <!-- 문의 유형 -->
          <div class="form-field">
            <label for="category" class="form-label">문의 유형 *</label>
            <select id="category" v-model="formData.category" required class="form-select">
              <option value="general">일반 문의</option>
              <option value="technical">기술 지원</option>
              <option value="policy">정책 문의</option>
              <option value="report">보안 문제 신고</option>
              <option value="improvement">개선 제안</option>
            </select>
          </div>

          <!-- 제목 -->
          <div class="form-field full-width">
            <label for="subject" class="form-label">제목 *</label>
            <input
              type="text"
              id="subject"
              v-model="formData.subject"
              required
              class="form-input"
            />
          </div>

          <!-- 문의 내용 -->
          <div class="form-field full-width">
            <label for="message" class="form-label">문의 내용 *</label>
            <textarea
              id="message"
              v-model="formData.message"
              required
              rows="6"
              class="form-textarea"
            ></textarea>
          </div>
        </div>

        <!-- 제출 버튼 -->
        <div class="form-submit">
          <button type="submit" :disabled="isSubmitting" class="submit-button">
            {{ isSubmitting ? '제출 중...' : '문의 제출' }}
          </button>
        </div>
      </form>
    </div>

    <div class="section">
      <h2 class="section-title">담당자 직접 연락</h2>
      <p>긴급한 문의나 직접 상담이 필요한 경우 아래 연락처로 문의하세요:</p>
      <div class="contact-grid">
        <!-- 보안감사팀 연락처 -->
        <div class="contact-card">
          <h3 class="contact-title">보안감사팀</h3>
          <p class="contact-info"><strong>담당자:</strong> 홍길동 팀장</p>
          <p class="contact-info"><strong>전화:</strong> 내선 1234</p>
          <p class="contact-info"><strong>이메일:</strong> security-audit@example.com</p>
          <p class="contact-info"><strong>업무시간:</strong> 평일 09:00 - 18:00</p>
        </div>

        <!-- IT 지원팀 연락처 -->
        <div class="contact-card">
          <h3 class="contact-title">IT 지원팀</h3>
          <p class="contact-info"><strong>담당자:</strong> 김철수 과장</p>
          <p class="contact-info"><strong>전화:</strong> 내선 4567</p>
          <p class="contact-info"><strong>이메일:</strong> it-support@example.com</p>
          <p class="contact-info"><strong>업무시간:</strong> 평일 09:00 - 20:00</p>
        </div>

        <!-- 네트워크 보안팀 연락처 -->
        <div class="contact-card">
          <h3 class="contact-title">네트워크 보안팀</h3>
          <p class="contact-info"><strong>담당자:</strong> 이영희 부장</p>
          <p class="contact-info"><strong>전화:</strong> 내선 7890</p>
          <p class="contact-info"><strong>이메일:</strong> network-security@example.com</p>
          <p class="contact-info"><strong>업무시간:</strong> 평일 09:00 - 18:00</p>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">자주 묻는 질문 (FAQ)</h2>
      <div class="faq-list">
        <div class="faq-item">
          <h3 class="faq-question">Q: 보안 감사는 얼마나 자주 진행되나요?</h3>
          <p class="faq-answer">
            A: 정기 보안 감사는 분기마다 진행되며, 상시보안감사는 시스템에서 자동으로 매일
            모니터링됩니다. 특별한 보안 이슈가 발생하면 추가적인 감사가 진행될 수 있습니다.
          </p>
        </div>

        <div class="faq-item">
          <h3 class="faq-question">Q: 보안 감사에서 문제가 발견되면 어떻게 해야 하나요?</h3>
          <p class="faq-answer">
            A: 문제가 발견되면 해당 페이지의 조치방법에 따라 조치하고, 문제가 지속되거나 도움이
            필요한 경우 보안감사팀에 문의하시기 바랍니다.
          </p>
        </div>

        <div class="faq-item">
          <h3 class="faq-question">Q: 제출한 문의는 언제 답변받을 수 있나요?</h3>
          <p class="faq-answer">
            A: 일반적으로 문의 제출 후 1-2 영업일 이내에 답변을 드립니다. 긴급한 문의의 경우 전화로
            직접 연락주시면 더 빠른 지원이 가능합니다.
          </p>
        </div>

        <div class="faq-item">
          <h3 class="faq-question">Q: 보안 정책에 대한 예외 요청은 어떻게 하나요?</h3>
          <p class="faq-answer">
            A: 보안 정책 예외 요청은 위 문의 양식에서 문의 유형을 "정책 문의"로 선택하고 상세한 예외
            필요 사유와 기간을 명시하여 제출해 주세요. 보안 위원회 검토 후 승인 여부를 알려드립니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 공통 페이지 네비게이션 컴포넌트 사용 -->
    <PageNavigation :currentPath="$route.path" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import PageNavigation from '@/components/PageNavigation.vue'

const route = useRoute()

// 폼 데이터
const formData = reactive({
  name: '',
  department: '',
  email: '',
  phone: '',
  category: 'general',
  subject: '',
  message: '',
})

// 제출 상태 관리
const isSubmitting = ref(false)
const submitResult = reactive({
  success: false,
  message: '',
})

// 폼 제출 핸들러
const handleSubmit = async (e) => {
  e.preventDefault()
  isSubmitting.value = true
  submitResult.message = ''

  // 여기서는 실제 API 호출 대신 제출 성공을 시뮬레이션합니다.
  // 실제 구현 시 API 엔드포인트로 데이터를 전송해야 합니다.
  try {
    // 실제 API 호출이 이루어져야 하는 부분
    // await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // });

    // 성공 처리 (시뮬레이션)
    setTimeout(() => {
      submitResult.success = true
      submitResult.message = '문의가 성공적으로 제출되었습니다. 담당자가 확인 후 연락드리겠습니다.'

      // 폼 초기화
      Object.assign(formData, {
        name: '',
        department: '',
        email: '',
        phone: '',
        category: 'general',
        subject: '',
        message: '',
      })

      isSubmitting.value = false
    }, 1000)
  } catch (error) {
    // 에러 처리
    submitResult.success = false
    submitResult.message = '문의 제출 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
    isSubmitting.value = false
  }
}
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

.submit-result {
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 4px;
}

.submit-result.success {
  background-color: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #a5d6a7;
}

.submit-result.error {
  background-color: #ffebee;
  color: #c62828;
  border: 1px solid #ef9a9a;
}

.contact-form {
  margin-top: 15px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.form-field.full-width {
  grid-column: 1 / -1;
}

.form-label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: var(--dark-blue);
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(64, 86, 185, 0.2);
  outline: none;
}

.form-textarea {
  resize: vertical;
  font-family: inherit;
}

.form-submit {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.submit-button {
  padding: 12px 30px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.submit-button:hover:not(:disabled) {
  background-color: var(--dark-blue);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 15px;
}

.contact-card {
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
}

.contact-title {
  margin: 0 0 10px 0;
  font-size: 1.1rem;
  color: var(--dark-blue);
}

.contact-info {
  margin: 5px 0;
  color: var(--dark-gray);
}

.faq-list {
  margin-top: 15px;
}

.faq-item {
  margin-bottom: 20px;
}

.faq-question {
  font-size: 1rem;
  font-weight: 600;
  color: var(--dark-blue);
  margin: 0 0 10px 0;
}

.faq-answer {
  margin: 0;
  color: var(--dark-gray);
  line-height: 1.5;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
