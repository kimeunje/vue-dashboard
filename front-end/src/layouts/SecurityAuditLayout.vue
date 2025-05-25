<template>
  <div class="content-wrapper">
    <Sidebar />
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
</script>

<style scoped>
.content-wrapper {
  display: flex;
  min-height: calc(100vh - 114px);
}

.main-content {
  flex: 1;
  padding: 24px;
  background-color: #ffffff;
  margin-left: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}
</style>
