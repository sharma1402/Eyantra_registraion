<script setup>
import OtpVerification from './OtpVerification.vue';

defineProps({ 
    modelValue: String,
    error: String,
    verified: Boolean    
})
defineEmits(['update:modelValue', 'update:verified', 'blur']);
</script>

<template>
    <div class="form-now">
        <label>Email ID</label>
        <input
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            @blur="$emit('blur')"
            :disabled="verified"
        />
        <p class="error">{{ error }}</p>
        <OtpVerification
            :email="modelValue"
            :email-valid="!error && !!modelValue"
            :verified="verified"
            @update:verified="$emit('update:verified', $event)"
        />
    </div>
</template>

<style scoped>
.form-row{ margin-bottom: 18px; }
label{ display: block; font-weight: 600; margin-bottom: 6px; font-size: 14px; }
input { padding: 8px 10px; border: 1px solid var(--border); border-radius: 5px; width: 100%; max-width: 320px; }
.error { color: #c62828; font-size: 13px; margin-top: 4px; }
</style>