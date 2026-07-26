<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="navbar">
    <h1>eYantra Competition Registration</h1>
    <nav class="tabs">
      <RouterLink to="/">Register</RouterLink>
      <RouterLink to="/participants">View Participants</RouterLink>
    </nav>
  </header>
  <main class="container">
    <RouterView />
  </main>
</template>

<style scoped>
.navbar {
  background: #d32f2f;
  color: #fff;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.navbar h1 { font-size: 18px; margin: 0; }
.tabs a {
  color: #fff;
  text-decoration: none;
  border: 1px solid rgba(255,255,255,0.6);
  padding: 6px 14px;
  margin-left: 8px;
  border-radius: 4px;
  font-size: 14px;
}
.tabs a.router-link-exact-active {
  background: #fff;
  color: #a31515;
  font-weight: 600;
}
.container {
  max-width: 780px;
  margin: 30px auto;
  padding: 0 16px;
}
</style>