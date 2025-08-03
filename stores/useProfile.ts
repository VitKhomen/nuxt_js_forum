// stores/useProfileStore.ts
import { defineStore } from 'pinia'

// ++ Определяем интерфейсы прямо здесь, чтобы файл был самодостаточным

// Описываем, как выглядит объект пользователя внутри сессии
interface UserProfile {
  id: string | number;
  username: string;
  email: string;
  // Добавь сюда другие поля, если они есть (например, avatar: string)
}

// Описываем, как выглядит объект данных сессии
interface AuthSessionData {
  user: UserProfile;
}

export const useProfileStore = defineStore('profile', () => {
  // Типизируем ref, он может содержать либо профиль, либо null
  const profile = ref<UserProfile | null>(null)

  function setProfile(data: UserProfile | null) {
    profile.value = data
  }

  async function fetchProfile(auth: ReturnType<typeof useAuth>) {
    // Используем утверждение типа `as`, чтобы "объяснить" TypeScript структуру
    const session = auth.data.value as AuthSessionData | null;

    // Проверяем статус и наличие пользователя в сессии
    if (auth.status.value !== 'authenticated' || !session?.user) {
      profile.value = null
      return
    }

    // ++ ОШИБКИ ЗДЕСЬ БОЛЬШЕ НЕ БУДЕТ
    // Мы работаем с `session`, тип которого мы только что явно определили
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
