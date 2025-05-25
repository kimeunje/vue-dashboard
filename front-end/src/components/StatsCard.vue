<template>
  <div :style="cardStyle">
    <h3 :style="titleStyle">
      {{ title }}
    </h3>
    <p :style="{ ...valueStyle, ...colorStyle }">
      {{ value }}
    </p>
    <p :style="subtitleStyle">{{ subtitle }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  valueColor: {
    type: String,
    default: '',
  },
})

// 색상 스타일 계산
const colorStyle = computed(() => {
  switch (props.valueColor) {
    case 'color-green':
      return { color: '#4caf50' }
    case 'color-red':
      return { color: '#f44336' }
    case 'color-blue':
      return { color: '#2196f3' }
    default:
      return { color: '#333' }
  }
})

// 카드 스타일
const cardStyle = {
  backgroundColor: 'white',
  borderRadius: '4px',
  padding: '15px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}

// 제목 스타일
const titleStyle = {
  fontSize: '0.875rem',
  fontWeight: '500',
  color: '#666',
  marginBottom: '8px',
  margin: '0 0 8px 0',
}

// 값 스타일
const valueStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '8px',
  margin: '0 0 8px 0',
}

// 부제목 스타일
const subtitleStyle = {
  fontSize: '0.875rem',
  color: '#666',
  margin: '0',
}
</script>

<style scoped>
/* 추가적인 스타일이 필요한 경우 여기에 작성 */
</style>
