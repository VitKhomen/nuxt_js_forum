// stores/usePosts.ts
import { defineStore } from 'pinia'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref([])

  const auth = useAuth()
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  async function fetchUserPosts(username: string) {
    const token = auth.token.value?.replace(/^Bearer\s/, '')
    const { data } = await useFetch(`${apiBase}/users/${username}/posts/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    posts.value = data.value?.results || []
  }

  return { posts, fetchUserPosts }
})