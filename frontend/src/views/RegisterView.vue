<script setup>
import { ref, onMounted } from 'vue';
import { api } from '@/services/api';
import { YEARS, DOMAINS, GENDERS } from '@/constants/formOptions';
import { useRegistrationForm } from '@/composables/useRegistrationForm';
import TextField from '@/components/form/TextField.vue';
import SelectedField from '@/components/form/SelectedField.vue';
import RadioGroup from '@/components/form/RadioGroup.vue';
import EmailVerificationField from '@/components/EmailVerificationField.vue';
import AppBanner from '@/components/AppBanner.vue';

const countries = ref([]);
const colleges = ref([]);
const otpVerified = ref(false);
const fieldOrder = ['name', 'contact', 'gender', 'email', 'year', 'domain', 'country', 'college'];

const { form, errors, banner, submitting, validateField, submit } = useRegistrationForm();

onMounted(async () => {
    countries.value = await api.getCountries();
    colleges.value = await api.getColleges();
});

async function handleSubmit() {
    const ok = await submit(fieldOrder, otpVerified.value);
    if (ok) otpVerified.value = false
}
</script>

<template>
    <div class="card">
        <h2>Eyantra Competition Registration</h2>
        <AppBanner :type="banner.type" :text="banner.text" />

        <form @submit.prevent="handleSubmit" novalidate>
            <TextField v-model="form.name" label="Full name" :error="errors.name" @blur="validateField('name')"/>
            <TextField v-model="form.contact" label="Contact Number" :error="errors.contact" maxlength="10" @blur="validateField('contact')"/>
            <RadioGroup v-model="form.gender" label="Gender" :options="GENDERS" :error="errors.gender" @change="validateField('gender')"/>
            <EmailVerificationField v-model="form.email" v-model:verified="otpVerified" :error="errors.email" @blur="validateField('email')"/>
            <SelectedField v-model="form.year" label="Year" :options="YEARS" :error="errors.year" @change="validateField('year')"/>
            <SelectedField v-model="form.domain" label="Domain / Department" :options="DOMAINS" :error="errors.domain" @change="validateField('domain')"/>
            <SelectedField v-model="form.country" label="Country" :options="countries" :error="errors.country" @change="validateField('country')"/>
            <SelectedField v-model="form.college" label="College" :options="colleges" :error="errors.college" @change="validateField('college')"/>
            <button type="submit" :disabled="submitting">{{ submitting ? 'Registering...' : 'Register' }}</button>
        </form>
    </div>
</template>

<style scoped>
button { 
    background: var(--primary); 
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 8px;
}
button:disabled { opacity: 0.5; }
</style>

