// stores/useProfileStore.ts
import { defineStore } from 'pinia'

// Описуємо обьект користувача в сессії
interface UserProfile {
  id: string | number;
  username: string;
  email: string;
  avatar: string;
  // можно добавить поnрібні поля
}

// Описуємо обьєкт сессії
interface AuthSessionData {
  user: UserProfile;
}

export const useProfileStore = defineStore('profile', () => {
  // Типизуємо ref, він може содержать лібо профіль, лібо null
  const profile = ref<UserProfile | null>(null)

  function setProfile(data: UserProfile | null) {
    profile.value = data
  }

  async function fetchProfile(auth: ReturnType<typeof useAuth>) {
    // використовуємо `as` щоб обьяснить TypeScript структуру
    const session = auth.data.value as AuthSessionData | null;

    // перевіряємо статус і наявність користувача в сесії
    if (auth.status.value !== 'authenticated' || !session?.user) {
      profile.value = null
      return
    }

    profile.value = session.user
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
