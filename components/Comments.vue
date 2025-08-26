<template>
  <div>
    <!-- Комментарі -->
    <div class="card my-4" v-if="isAuthenticated">
      <h5 class="card-header">Залишити коментар:</h5>
      <div class="card-body">
        <form @submit.prevent="submitComment">
          <div class="form-group mb-3">
            <textarea
              v-model="newComment"
              rows="4"
              class="form-control rounded shadow-sm"
              placeholder="Напиши що-небудь..."
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary mt-2">Відправити</button>
        </form>
      </div>
    </div>
    <div v-else class="mb-3">
      <NuxtLink to="/login">Увійдіть щоб залишити коментар</NuxtLink>
    </div>

    <!-- Список коментарів -->
    <div v-if="commentStore.isLoading" class="text-center">Загрузка коментарів...</div>

    <div v-else-if="commentStore.comments.length">
      <div v-for="comment in commentStore.comments" :key="comment.id" class="bg-light p-3 mb-3 rounded shadow-sm">
        <div class="d-flex">
          <img :src="comment.author_avatar" class="rounded-circle" style="width: 100px; height: 100px;" />
          <div class="ms-3">
            <h5>{{ comment.author }}</h5>
            <small class="text-muted">{{ formatDate(comment.created_date) }}</small>

            <!-- якшо в режиме редагування -->
            <div v-if="editingId === comment.id">
              <textarea v-model="editText" rows="3" class="form-control mb-2"></textarea>
              <button @click="handleUpdate(comment.id)" class="btn btn-sm btn-success me-2">💾 Зберегти</button>
              <button @click="cancelEdit" class="btn btn-sm btn-secondary">❌ Відміна</button>
            </div>
            <!-- Інакше звичайни текст -->
            <p v-else>{{ comment.text }}</p>

            <div v-if="comment.author === user.username">
              <button @click="startEdit(comment)" class="btn btn-sm btn-outline-primary me-2">✏️</button>
              <button @click="handleDelete(comment.id)" class="btn btn-sm btn-outline-danger">🗑️</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center">Пока нема комментарів.</div>
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
const editingId = ref(null)
const editText = ref('')


onMounted(() => {
  console.log('Slug:', slug)
  if (!slug) {
    console.error('Slug is undefined or null — неможливо відправити коментар')
    return;
  }
  commentStore.fetchComments(slug)
})

function formatDate(date) {
  return new Date(date).toLocaleString('ru-RU')
}

async function submitComment() {
  await commentStore.addComment(slug, newComment.value, auth.token.value.replace(/^Bearer\s/, ''))
  newComment.value = ''
}

function startEdit(comment) {
  editingId.value = comment.id
  editText.value = comment.text
}

function cancelEdit() {
  editingId.value = null
  editText.value = ''
}

async function waitForToken() {
  // приклад загрузки токена
  while (!auth.token.value) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  return auth.token.value;
}

async function handleUpdate(id) {
  const tokenValue = await waitForToken();
  const token = tokenValue.replace(/^Bearer\s/, '');
  await commentStore.updateComment(id, editText.value, token);
  editingId.value = null;
  editText.value = '';
}

async function handleDelete(id) {
  if (confirm('ви впевнені шо хочете видалити коментар?')) {
    const tokenValue = await waitForToken();
    const token = tokenValue.replace(/^Bearer\s/, '');
    await commentStore.deleteComment(id, token);
  }
}
</script>