<template>
  <div>
    <!-- Комментарии -->
    <div class="card my-4" v-if="isAuthenticated">
      <h5 class="card-header">Оставить комментарий:</h5>
      <div class="card-body">
        <form @submit.prevent="submitComment">
          <div class="form-group mb-3">
            <textarea
              v-model="newComment"
              rows="4"
              class="form-control rounded shadow-sm"
              placeholder="Напишите что-нибудь..."
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary mt-2">Отправить</button>
        </form>
      </div>
    </div>
    <div v-else class="mb-3">
      <NuxtLink to="/login">Войдите</NuxtLink>, чтобы оставить комментарий.
    </div>

    <!-- Список комментариев -->
    <div v-if="comments.length">
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="d-flex mb-3 p-3 bg-light rounded shadow-sm"
      >
        <div class="flex-shrink-0">
          <img
            :src="comment.author.avatar"
            alt=""
            class="rounded-circle img-fluid border"
            style="width: 150px; height: 150px;"
          />
        </div>
        <div class="flex-grow-1 ms-3">
          <h5 class="mt-0">{{ comment.author.username }}</h5>
          <small class="text-muted">{{ formatDate(comment.created_at) }}</small>
          <p>{{ comment.text }}</p>
        </div>
        <div v-if="comment.author.username === user.username" class="mt-2">
          <NuxtLink :to="`/comments/update/${comment.id}`" class="btn btn-sm btn-outline-primary">✏️ Изменить</NuxtLink>
          <NuxtLink :to="`/comments/delete/${comment.id}`" class="btn btn-sm btn-outline-danger">🗑️ Удалить</NuxtLink>
        </div>
      </div>
    </div>
    <div v-else class="text-center">Пока нет комментариев.</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

// --- Настройки ---
const route = useRoute()
const postSlug = route.params.slug
const newComment = ref('')

// Мнимый пользователь (замени потом на real auth)
const user = ref({
  username: 'admin',
  isAuthenticated: true,
})
const isAuthenticated = user.value.isAuthenticated

// --- Комментарии ---
const { data: commentData, refresh } = await useFetch(
  `http://127.0.0.1:8000/api/comments/${postSlug}/`
)

const comments = ref(commentData.value || [])

// --- Отправка комментария ---
async function submitComment() {
  if (!newComment.value.trim()) return

  try {
    await $fetch(`http://127.0.0.1:8000/api/comments/${postSlug}/`, {
      method: 'POST',
      body: {
        text: newComment.value,
      },
      headers: {
        Authorization: 'Bearer <token>', // заменишь на реальный
      },
    })

    newComment.value = ''
    await refresh()
  } catch (error) {
    console.error('Ошибка при отправке комментария:', error)
  }
}

// --- Форматирование даты ---
function formatDate(date) {
  return new Date(date).toLocaleString('ru-RU')
}
</script>