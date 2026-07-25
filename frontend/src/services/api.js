const BASE = 'api';

async function request(path, options = {}) {
    const res = await fetch(`${BASE}${path}`, {
        headers: {'Content-Type': 'application/json'},
        ...options
    })
    const data = await res.json().catch(() => ({}));
    if(!res.ok) {
        const err = new Error(data.error || 'Request failed')
        err.data = data;
        throw err;
    }
    return data;
}

export const api = {
    getCountries: () => request('/countries'),
    getColleges: () => request('/colleges'),
    sendOtp: (email) => request('/send-otp',{ 
        method: 'POST', 
        body: JSON.stringify({email})
    }),
    verifyOtp: (email, otp) => request('/verify-otp',{ 
        method: 'POST', 
        body: JSON.stringify({email, otp})
    }),
    register: (form) => request('/register', {
        method: 'POST',
        body: JSON.stringify(form)
    }),
    getRegistration: (params) => request(`/registration?${new URLSearchParams(params)}`)
}