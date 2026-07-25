import { ref } from 'vue';
import { api } from '@/service/api';

export function useOtpVerification() {
    const otp = ref('');
    const otpSent = ref(false);
    const otpVerified = ref(false);
    const devOtp = ref('');
    const message = ref('');

    async function sendOtp(email) {
        try {
            const data = await api.sendOtp(email);
            otpSent.value = true;
            otpVerified.value = false;
            devOtp.value = data.devOtp;
            message.value = 'OTP generated (dev-mode - no SMTP configured).';
        } catch (err) {
            otpSent.value = false;
            message.value = err.data?.error || err.message;
        }
    }

    async function verifyOtp(email) {
        try {
            const data =  await api.verifyOtp(email, otp.value.trim());
            otpVerified.value = !!data.verified;
            message.value =  data.verified ? 'Email verified.' : (data.error || 'Verification failed.');
        } catch(err) {
            otpVerified.value = false;
            message.value = err.data?.error || err.message;
        }
    }

    return { otp, otpSent, otpVerified, devOtp, message, sendOtp, verifyOtp};
}