<script>
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
        <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value); $emit('change')">
            <option value="" disabled>{{ placeholder || 'Select...' }}</option>
            <option 
            v-for="opt in $options" 
            :key="opt" 
            :value="opt"
            >
                {{ opt }}
            </option>
        </select>
        <p class="error" v-if="error">{{ error }}</p>
    </div>
</template>

<style scoped>
.form-row{ margin-bottom: 18px; }
label{ display: block; font-weight: 600; margin-bottom: 6px; font-size: 14px; }
input { padding: 8px 10px; border: 1px solid var(--border); border-radius: 5px; width: 100%; max-width: 320px; }
.error { color: #c62828; font-size: 13px; margin-top: 4px; }
</style>