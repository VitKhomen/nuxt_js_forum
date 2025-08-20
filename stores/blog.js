import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', () => {
  const tags = ref([])
  const latestPosts = ref([])
  const config = useRuntimeConfig() // Получаем доступ к конфигу
  const apiBase = config.public.apiBase // Наш базовый URL

  const isLoaded = ref(false)

  const fetchAsideData = async () => {
    if (isLoaded.value) return // чтобы не загружать повторно

    const [tagsData, postsData] = await Promise.all([
      useFetch(`${apiBase}/tags`),
      useFetch(`${apiBase}/aside`)
    ])

    tags.value = tagsData.data.value || []
    latestPosts.value = postsData.data.value || []

    isLoaded.value = true
  }

  return {
    tags,
    latestPosts,
    fetchAsideData,
  }
})