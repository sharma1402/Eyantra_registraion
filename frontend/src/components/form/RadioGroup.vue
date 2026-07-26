<script setup>
defineProps({ 
    modelValue: String,
    label: String,
    options: Array,
    error: String,
    placeholder: String,
})
defineEmits(['update:modelValue', 'change'])
</script>

<template>
    <div class="form-row">
        <label>{{ label }}</label>
        <label v-for="opt in options" :key="opt" class="radio">
        <input type="radio" :value="opt" :checked="modelValue === opt"
                @change="$emit('update:modelValue', opt); $emit('change')" /> {{ opt }}
        </label>
        <p class="error" v-if="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.form-row{ margin-bottom: 18px; }
label{ display: block; font-weight: 600; margin-bottom: 6px; font-size: 14px; }
.radio{ display: inline-flex; align-items: center; gap: 4px; margin-right: 16px; font-weight: 400; }
input { width: auto; }
.error { color: #c62828; font-size: 13px; margin-top: 4px; }
</style>