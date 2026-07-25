<script setup>
import { useOtpVerification } from '@/composables/useOtpVerification';

const props = defineProps({ email: String, emailValid: Boolean, verified: Boolean });
const emit = defineEmits(['update:verified']);

const { otp, otpSent, otpVerified, devOtp, message, sendOtp, verifyOtp } = useOtpVerification();

async function handleVerify() {
    await verifyOtp(props.email);
    emit('update:verified', otpVerified.value);
}
</script>

<template>
    <div>
        <button type="button" @click="handleSend" :disabled="verified">
            {{ otpSent ? 'Resend OTP' : 'Send OTP' }}
        </button>
        <div v-if="otpSent && !verified">
            <input v-model="otp" placeholder="Enter OTP" maxlength="6"/>
            <button type="button" @click="handleVerify">Verify</button>
        </div>
        <div v-if="devOtp" class="banner_info" >Dev mode OTP: <strong>{{ devOtp }}</strong></div>
        <p v-if="message">{{ message }}</p>
    </div>
</template>