<script setup>
defineProps({ type: String, text: String })
</script>

<template>
  <div v-if="text" :class="['banner', type]">{{ text }}</div>
</template>

<style scoped>
.banner { padding: 10px 14px; border-radius: 6px; margin-bottom: 16px; font-size: 14px; }
.banner.success { background: #e8f5e9; color: #1b8a3e; }
.banner.error { background: #fdecea; color: #c62828; }
.banner.info { background: #eef3fc; color: #1b4fa0; }
</style>