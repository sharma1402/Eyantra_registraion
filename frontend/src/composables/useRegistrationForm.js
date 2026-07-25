// Registration form composable
import { reactive, ref } from 'vue';
import { api } from '@/service/api';
import { VALIDATORS } from '@/constants/formOptions';

export function useRegistrationForm() {
    const form = reactive({
        name: '', contact: '', gender: '', email: '',
        year: '', domain: '', country:'', college: ''
    });
    const errors = reactive({});
    const banner = reactive({ type: '', text: ''});
    const submitting = ref(false);

    function validateField(field){
        const rule = VALIDATORS[field];
        errors[field] = rule 
            ? (rule.test(form[field] || '') ? '' : rule.message)
            : (form[field] ? '' : 'This field is required');
    }

    function validateAll(fields){
        fields.forEach(validateField);
        return fields.every(f => !errors[f]);
    }

    function resetForm(){
        Object.keys(form).forEach(k => (form[k] = ''));
        Object.keys(errors).forEach(k => (errors[k] = ''));
    }

    async function submit(fieldOrder, otpVerified) {
        banner.type = ''   ;
        banner.text = '';
        if(!validateAll(fieldOrder)) return false;
        if(!otpVerified) {
            banner.type = 'error';
            banner.text = 'Please verify your email before registration.';
            return false;
        }
        submitting.value = true;
        try {
            const data = await api.register(form);
            banner.type = 'success';
            banner.text = `Registered! Welcome ${data.entry.name}.`;
            resetForm();
            return true;
        } catch (err) {
            if(err.data?.errors) Object.assign(errors, err.data.errors);
            banner.type = 'error';
            banner.text = 'Please fix the highlighted errors.';
            return false;
        } finally {
            submitting.value = false;
        }
    }

    return { form, errors, banner, submitting, validateField, submit };
}