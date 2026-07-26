<script setup>
defineProps({ 
    registrations: Array,
    loading: Boolean 
})
</script>

<template>
    <p v-if="loading">Loading...</p>
    <p v-else-if="registrations.length === 0">No registrations found.</p>
    <table v-else>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Country</th>
                <th>College</th>
                <th>Contact Number</th>
                <th>Gender</th>
                <th>year</th>
                <th>domain</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="r in registrations" :key="r.id">
                <td>{{ r.name }}</td>
                <td>{{ r.email }}</td>
                <td>{{ r.country }}</td>
                <td>{{ r.college }}</td>
                <td>{{ r.contact }}</td>
                <td>{{ r.gender }}</td>
                <td>{{ r.year }}</td>
                <td>{{ r.domain }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
table { width: 100%; border-collapse: collapse; font-size: 13px; }
th, td { border: 1px solid var(--border); padding: 8px; text-align: left; }
</style>