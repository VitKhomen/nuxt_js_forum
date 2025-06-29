<script setup lang="ts">
import { useRouter } from 'vue-router'

const { signOut } = useAuth()
const router = useRouter()

await signOut()
router.push('/')
</script>

<template>
  <div class="container mt-5">
    <p>Logging out...</p>
  </div>
</template>