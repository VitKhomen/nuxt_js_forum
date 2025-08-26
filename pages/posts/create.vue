<template>
  <div class="container mt-5">
    <h1>Створення поста</h1>

    <form @submit.prevent="createPost">
      <div class="mb-3">
        <label class="form-label">Заголовок</label>
        <input v-model="form.title" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Короткий опис</label>
        <textarea v-model="form.description" class="form-control" rows="4"></textarea>
      </div>

      <div class="mb-3">
        <label class="form-label">Повна статя</label>
        <textarea v-model="form.content" class="form-control" rows="10"></textarea>
      </div>

      <div class="mb-3">
        <label class="form-label">Теги (через кому)</label>
        <input v-model="tagsInput" class="form-control" />
      </div>

      <div class="mb-3">
        <label class="form-label">Зображення</label>
        <input
          type="file"
          class="form-control"
          @change="e => form.image = (e.target as HTMLInputElement).files?.[0] || null"
        />
      </div>

      <button type="submit" class="btn btn-primary">🚀 Опублікувати</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuth()
const config = useRuntimeConfig()
const apiBase = config.public.apiBase

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
    await $fetch<Post>(`${apiBase}/posts/`, {
      method: 'POST',
      body: data,
      headers: {
        Authorization: auth.token.value || '',
      },
    })

    router.push('/') // чи сторінку нового поста
  } catch (err) {
  // Выводимо err.data, де лежать деталі від DRF
  console.error('Помилка валідації від бекенда:', err.data) 
  alert('Не вдалося створити пост. Подробиці в консолі.')
}
}
</script>