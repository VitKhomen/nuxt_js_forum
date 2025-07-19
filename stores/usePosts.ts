// stores/usePosts.ts
import { defineStore } from 'pinia'

interface PostsResponse {
  results: Post[];  // Предположим, что Post — это тип одного поста
}

interface Post {
  id: number;
  title: string;
  content: string;
  slug: string;
  image: string;
  description: string;
}

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<PostsResponse['results']>([])

  const auth = useAuth()
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  async function fetchUserPosts(username: string) {
    const token = auth.token.value?.replace(/^Bearer\s/, '')
    const { data } = await useFetch<PostsResponse>(`${apiBase}/users/${username}/posts/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    posts.value = data.value?.results || []
  }

  return { posts, fetchUserPosts }
})