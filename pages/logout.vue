<template>
  <div class="container mt-5">
    <p>Вихід з акаунта...</p>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '#imports'
import { useRouter } from 'vue-router'

const { signOut } = useAuth()
const router = useRouter()

const logout = async () => {
  try {
    await signOut({ callbackUrl: '/' }) // не передаем URL вручную
  } catch (e) {
    console.error('Logout error:', e)
  }
}
</script>