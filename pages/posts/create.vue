<template>
  <div class="container mt-5">
    <h1>Создание нового поста</h1>

    <form @submit.prevent="createPost">
      <div class="mb-3">
        <label class="form-label">Заголовок</label>
        <input v-model="form.title" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Краткое описание</label>
        <textarea v-model="form.description" class="form-control" rows="4"></textarea>
      </div>

      <div class="mb-3">
        <label class="form-label">Полное содержимое</label>
        <textarea v-model="form.content" class="form-control" rows="10"></textarea>
      </div>

      <div class="mb-3">
        <label class="form-label">Теги (через запятую)</label>
        <input v-model="tagsInput" class="form-control" />
      </div>

      <div class="mb-3">
        <label class="form-label">Изображение</label>
        <input
          type="file"
          class="form-control"
          @change="e => form.image = (e.target as HTMLInputElement).files?.[0] || null"
        />
      </div>

      <button type="submit" class="btn btn-primary">🚀 Опубликовать</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuth()
const config = useRuntimeConfig()

interface Post {
  id: number
  title: string
  content: string
  slug: string
  image: string
  description: string
  author: string 
  tags: string[]
}

const form = ref({
  title: '',
  description: '',
  content: '',
  image: null,
})
const tagsInput = ref('')

async function createPost() {
  const data = new FormData()
  data.append('title', form.value.title)
  data.append('description', form.value.description)
  data.append('content', form.value.content)

  const tags = tagsInput.value
    .split(',')
    .map(tag => tag.trim())
    .filter(Boolean)

  tags.forEach(tag => data.append('tags', tag))

  if (form.value.image) {
    data.append('image', form.value.image)
  }

  try {
    await $fetch<Post>(`${config.public.apiBase}/posts/`, {
      method: 'POST',
      body: data,
      headers: {
        Authorization: auth.token.value || '',
      },
    })

    router.push('/') // или на страницу нового поста
  } catch (err) {
  // Выводим именно err.data, где лежат детали от DRF
  console.error('Ошибка валидации от бэкенда:', err.data) 
  alert('Не удалось создать пост. Подробности в консоли.')
}
}
</script>