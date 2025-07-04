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
    <div v-if="commentStore.isLoading" class="text-center">Загрузка комментариев...</div>

    <div v-else-if="commentStore.comments.length">
      <div v-for="comment in commentStore.comments" :key="comment.id" class="bg-light p-3 mb-3 rounded shadow-sm">
        <div class="d-flex">
          <img :src="comment.avatar" class="rounded-circle" style="width: 100px; height: 100px;" />
          <div class="ms-3">
            <h5>{{ comment.author }}</h5>
            <small class="text-muted">{{ formatDate(comment.created_date) }}</small>
            <p>{{ comment.text }}</p>
            <div v-if="comment.author === user.username">
              <NuxtLink :to="`/comments/update/${comment.id}`" class="btn btn-sm btn-outline-primary">✏️</NuxtLink>
              <NuxtLink :to="`/comments/delete/${comment.id}`" class="btn btn-sm btn-outline-danger">🗑️</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center">Пока нет комментариев.</div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useCommentStore } from '~/stores/comments'
import { ref, computed, onMounted } from 'vue'

const route = useRoute()
const slug = route.params.slug

const commentStore = useCommentStore()
const auth = useAuth()

const isAuthenticated = computed(() => auth.status.value === 'authenticated')
const user = computed(() => auth.data.value?.user || {})
const newComment = ref('')

onMounted(() => {
  commentStore.fetchComments(slug)
})

function formatDate(date) {
  return new Date(date).toLocaleString('ru-RU')
}

async function submitComment() {
  await commentStore.addComment(slug, newComment.value, auth.token.value.replace(/^Bearer\s/, ''))
  newComment.value = ''
}
</script>