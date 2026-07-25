<script>
defineProps({ 
    modelValue: String,
    label: String,
    error: String,
    maxlength: [String, Number],
    disabled: Boolean
})
defineEmits(['update:modelValue', 'blur'])
</script>

<template>
    <div class="form-row">
        <label v-if="label">{{ label }}</label>
        <input
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            @blur="$emit('blur')"
            :maxlength="maxlength"
            :disabled="disabled"
        />
        <p class="error" v-if="error">{{ error }}</p>
    </div>
</template>

<style scoped>
.form-row{ margin-bottom: 18px; }
label{ display: block; font-weight: 600; margin-bottom: 6px; font-size: 14px; }
input { padding: 8px 10px; border: 1px solid var(--border); border-radius: 5px; width: 100%; max-width: 320px; }
.error { color: #c62828; font-size: 13px; margin-top: 4px; }
</style>