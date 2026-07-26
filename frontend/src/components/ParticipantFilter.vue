<script setup>
defineProps({ 
    countries: Array, 
    colleges: Array, 
    country: String, 
    college: String 
})
const emit = defineEmits([
    'update:country', 
    'update:college'
])
</script>

<template>
  <div class="filters">
    <select :value="country" @change="emit('update:country', $event.target.value)">
      <option value="">All Countries</option>
      <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
    </select>
    <select :value="college" @change="emit('update:college', $event.target.value)">
      <option value="">All Colleges</option>
      <option v-for="c in colleges" :key="c" :value="c">{{ c }}</option>
    </select>
  </div>
</template>
<style scoped>
.filters { display: flex; gap: 12px; margin-bottom: 16px; }
select { padding: 8px 10px; border: 1px solid var(--border); border-radius: 5px; }
</style>