import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', () => {
  const tags = ref([])
  const latestPosts = ref([])

  const isLoaded = ref(false)

  const fetchAsideData = async () => {
    if (isLoaded.value) return // чтобы не загружать повторно

    const [tagsData, postsData] = await Promise.all([
      useFetch('http://127.0.0.1:8000/api/tags'),
      useFetch('http://127.0.0.1:8000/api/aside')
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