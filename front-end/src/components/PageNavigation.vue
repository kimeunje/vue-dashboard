<template>
  <div class="pagination">
    <button @click="navigateToPrevious" :disabled="!prevItem" :class="{ disabled: !prevItem }">
      {{ prevItem ? `이전: ${prevItem.title}` : '이전' }}
    </button>

    <button @click="navigateToNext" :disabled="!nextItem" :class="{ disabled: !nextItem }">
      {{ nextItem ? `다음: ${nextItem.title}` : '다음' }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getPreviousMenuItem, getNextMenuItem } from '@/data/security-audit-config'

const props = defineProps({
  currentPath: {
    type: String,
    default: '',
  },
})

const router = useRouter()
const route = useRoute()

// 현재 경로 계산 (props로 전달된 값이 있으면 사용, 없으면 현재 라우트 경로 사용)
const currentPath = computed(() => props.currentPath || route.path)

// 이전/다음 메뉴 아이템 가져오기
const prevItem = computed(() => getPreviousMenuItem(currentPath.value))
const nextItem = computed(() => getNextMenuItem(currentPath.value))

// 이전 페이지로 이동
const navigateToPrevious = () => {
  if (prevItem.value) {
    router.push(prevItem.value.path)
  }
}

// 다음 페이지로 이동
const navigateToNext = () => {
  if (nextItem.value) {
    router.push(nextItem.value.path)
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e4e9;
}

.pagination button {
  padding: 0.75rem 1.5rem;
  border: 1px solid #e0e4e9;
  border-radius: 6px;
  background-color: white;
  color: #4056b9;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination button:hover:not(.disabled) {
  background-color: #4056b9;
  color: white;
  border-color: #4056b9;
}

.pagination button.disabled {
  color: #9ca3af;
  cursor: not-allowed;
  border-color: #e5e7eb;
}

.pagination button.disabled:hover {
  background-color: white;
  color: #9ca3af;
  border-color: #e5e7eb;
}
</style>
