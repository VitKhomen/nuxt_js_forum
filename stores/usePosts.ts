import { defineStore } from 'pinia'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<any[]>([])
  const totalCount = ref(0)
  const nextPageUrl = ref<string | null>(null)
  const prevPageUrl = ref<string | null>(null)
  const isLoading = ref(false)

  // Прибираємо `auth` из параметрів, будемо получать його прямо в екшені
  async function fetchUserPosts(username: string, page: number = 1) {
    if (!username) return;

    // ++ ШАГ 1: Получаем доступ к состоянию аутентификации
    const auth = useAuth() 

    // ++ ШАГ 2: Перевіряємо, залогинен лі користувач
    if (auth.status.value !== 'authenticated') {
      console.warn('Користувач не авторизован, запит постів відмінено.')
      return
    }

    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase
    isLoading.value = true
    
    try {
      const response = await $fetch<{ count: number, next: string | null, previous: string | null, results: any[] }>(
        `${apiBase}/users/${username}/posts/?page=${page}`,
        {
          // ++ ШАГ 3: Добавляем заголовок авторизації
          headers: {
            Authorization: auth.token.value || ''
          }
        }
      );

      posts.value = response.results
      totalCount.value = response.count
      nextPageUrl.value = response.next
      prevPageUrl.value = response.previous
    } catch (error) {
      console.error("Failed to fetch user posts:", error);
      posts.value = []
      totalCount.value = 0
      nextPageUrl.value = null
      prevPageUrl.value = null
    } finally {
      isLoading.value = false
    }
  }

  return {
    posts,
    totalCount,
    nextPageUrl,
    prevPageUrl,
    isLoading,
    fetchUserPosts
  }
})