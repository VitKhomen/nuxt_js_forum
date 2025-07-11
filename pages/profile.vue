<script setup lang="ts">

const { data: session, getSession, status } = useAuth()

await getSession()
const auth = useAuth()

// definePageMeta({
//   middleware: 'auth' // 👈 Вот так включается защита для этой конкретной страницы
// })
</script>

<template>
  <div class="container mt-5">
    <h1>Profile Page</h1>
    <div v-if="status === 'loading'">Loading...</div>
    <div v-else-if="session">
      <pre>{{ session }}</pre>
    </div>
    <div v-else>
      <p>You are not logged in. <NuxtLink to="/login">Login here</NuxtLink>.</p>
    </div>
  </div>
</template>