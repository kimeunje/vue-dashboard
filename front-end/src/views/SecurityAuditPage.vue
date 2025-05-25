<template>
  <div>
    <h1 class="page-title">상시보안감사</h1>
    <div class="section">
      <p>상시보안감사 시스템에 오신 것을 환영합니다.</p>
      <p>왼쪽 사이드바에서 원하는 메뉴를 선택하여 시작하세요.</p>
    </div>
  </div>
</template>

<script setup>
// 이 페이지는 단순한 안내 페이지이므로 추가 로직이 필요하지 않습니다
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
</style>
