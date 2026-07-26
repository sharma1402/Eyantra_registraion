<script setup>
import { ref, onMounted, watch } from 'vue';
import { api } from '@/services/api';
import ParticipantFilter from '@/components/ParticipantFilter.vue';
import ParticipantsTable from '@/components/ParticipantsTable.vue';

const countries = ref([]);
const colleges = ref([]);
const registrations = ref([]);
const filterCountry = ref('');
const filterCollege = ref('');
const loading = ref(false);

async function loadData() {
    loading.value = true;
    const params = {};
    if(filterCountry.value) params.country = filterCountry.value;
    if(filterCollege.value) params.college = filterCollege.value;
    registrations.value = await api.getRegistrations(params)
    loading.value = false;
}

onMounted(async () => {
    countries.value = await api.getCountries();
    colleges.value = await api.getColleges();
    await loadData();
});

watch([filterCountry, filterCollege], loadData);
</script>

<template>
  <div class="card">
    <h2>Registered Participants</h2>
    <ParticipantFilter :countries="countries" :colleges="colleges" v-model:country="filterCountry" v-model:college="filterCollege" />
    <ParticipantsTable :registrations="registrations" :loading="loading" />
  </div>
</template>