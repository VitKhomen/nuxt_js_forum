import { defineStore } from 'pinia'

export const useCommentStore = defineStore('comments', () => {
  const comments = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const config = useRuntimeConfig() // Получаем доступ к конфигу
  const apiBase = config.public.apiBase // Наш базовый URL
  

  async function fetchComments(slug) {
    isLoading.value = true
    error.value = null

    try {
      const { data } = await useFetch(`${apiBase}/comments/post/${slug}/`)
      comments.value = data.value || []
    } catch (e) {
      error.value = e
    } finally {
      isLoading.value = false
    }
  }




  async function addComment(slug, text, token) {
    if (!text.trim()) return

    try {
      await $fetch(`${apiBase}/comments/post/${slug}/`, {
        method: 'POST',
        body: { text },
        headers: {
          Authorization: `Bearer ${token}`
          }
      })
      await fetchComments(slug)
    } catch (e) {
      error.value = e
    }
  }

  async function updateComment(id, text, token) {
  const data = await $fetch(`${apiBase}/comments/id/${id}/`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: { text }
  })

  if (data) {
    const index = this.comments.findIndex(c => c.id === id)
    if (index !== -1) this.comments[index] = data
  }
}

  async function deleteComment(id, token) {
      await $fetch(`${apiBase}/comments/id/${id}/`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      this.comments = this.comments.filter(c => c.id !== id)
    }
  

  return {
    comments,
    isLoading,
    error,
    fetchComments,
    addComment,
    updateComment,
    deleteComment
  }
})