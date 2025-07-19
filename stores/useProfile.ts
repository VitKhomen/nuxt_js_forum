import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<any>(null)

  const auth = useAuth()
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  async function fetchProfile() {
    await auth.getSession()
    profile.value = auth.data.value?.user || {}
  }

  async function updateProfile(data: FormData) {
    const token = auth.token.value?.replace(/^Bearer\s/, '')
    await $fetch(`${apiBase}/profile/`, {
      method: 'PUT',
      body: data,
      headers: { Authorization: `Bearer ${token}` }
    })
    await fetchProfile()
  }

  return { profile, fetchProfile, updateProfile }
})