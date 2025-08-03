import { defineStore } from 'pinia'

interface PostsResponse {
  results: Post[]
}

interface Post {
  id: number
  title: string
  content: string
  slug: string
  image: string
  description: string
  tags: string
  created_at: string
}

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<Post[]>([])

  async function fetchUserPosts(auth: ReturnType<typeof useAuth>, username: string) {
    if (auth.status.value !== 'authenticated') return

    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase
    const token = auth.token.value?.replace(/^Bearer\s/, '')

    if (!token) {
      console.warn('⚠️ Нет токена, пользователь не авторизован')
      return
    }

    try {
      const response = await $fetch<PostsResponse>(`${apiBase}/users/${username}/posts/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      posts.value = response.results
    } catch (err) {
      console.error('Ошибка загрузки постов пользователя:', err)
    }
  }

  return { posts, fetchUserPosts }
})
