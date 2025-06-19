import { defineStore } from 'pinia'

export const useCommentStore = defineStore('comments', () => {
  const comments = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // Загрузка комментариев по slug
  async function fetchComments(slug) {
    isLoading.value = true
    error.value = null

    try {
      const { data } = await useFetch(`http://127.0.0.1:8000/api/comments/${slug}/`)
      comments.value = data.value || []
    } catch (e) {
      error.value = e
    } finally {
      isLoading.value = false
    }
  }

  // Добавление комментария
  async function addComment(slug, text) {
    if (!text.trim()) return

    try {
      await $fetch(`http://127.0.0.1:8000/api/comments/${slug}/`, {
        method: 'POST',
        body: { text },
        headers: {
          Authorization: 'Bearer <token>' // заменишь на реальный
        }
      })
      await fetchComments(slug) // обновляем после отправки
    } catch (e) {
      error.value = e
    }
  }

  return {
    comments,
    isLoading,
    error,
    fetchComments,
    addComment
  }
})