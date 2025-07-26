import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<any>(null)

  function setProfile(data: any) {
    profile.value = data
  }

  async function fetchProfile(auth: ReturnType<typeof useAuth>) {

    if (auth.status.value !== 'authenticated') {
      profile.value = null
      return
    }

    profile.value = auth.data.value?.user || {}
  }

  async function updateProfile(auth: ReturnType<typeof useAuth>, data: FormData) {
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase


    if (auth.status.value !== 'authenticated') {
      throw new Error('Не авторизован')
    }

    await $fetch(`${apiBase}/profile/`, {
      method: 'PUT',
      body: data,
      headers: {
        Authorization: auth.token.value || ''
      }
    })

    await fetchProfile(auth)
  }

  return { profile, setProfile, fetchProfile, updateProfile }
})