<template>
  <div class="container mt-5">
    <p>Вихід з акаунта...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const { signOut } = useAuth()

onMounted(async () => {
    try {
      await signOut({ callbackUrl: '/' })
    } catch (e) {
      console.error('Logout error:', e)
    }
  })
</script>