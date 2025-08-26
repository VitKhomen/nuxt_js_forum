<template>
  <div class="container mt-5">
    <h1>Редагування поста</h1>

    <form @submit.prevent="savePost" v-if="form">
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
        <label class="form-label">Тегі (через кому)</label>
        <input v-model="tagsInput" class="form-control" />
      </div>

      <div class="mb-3">
        <label class="form-label">Зображення (не обирай, якшо не змінюєшь)</label>
        <input
          type="file"
          class="form-control"
          @change="e => form.image = (e.target as HTMLInputElement).files?.[0] || null"
        />
      </div>

      <button type="submit" class="btn btn-success">💾 Зберегти</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const auth = useAuth()
const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const slug = route.params.slug as string
const form = ref<any>(null)
const tagsInput = ref('')



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

interface Session {
  user?: { // user може отсутствовать, тому він опциональний
    username: string;
    // тут можуть бути і інші поля, email, id и т.д.
  }
}


// Функція для видалення HTML-тегів з строки
function stripHtml(html: string | null): string {
  if (!html) return ''
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}

// Загрузка поста
onMounted(async () => {
  await auth.getSession()

  if (auth.status.value !== 'authenticated') {
    return router.push('/login')
  }

  try {
    const post = await $fetch<Post>(`${apiBase}/posts/${slug}`)
    // перевірка авторства
     // ++ використовуємо затвердження типа для AUTH.DATA
    const currentUser = (auth.data.value as Session)?.user?.username
    if (post.author !== currentUser) {
      alert('Ви не є автором цього поста.')
      return router.push('/')
    }

    form.value = {
      title: post.title,
      description: stripHtml(post.description),
      content: stripHtml(post.content),
      image: null,
    }
    tagsInput.value = post.tags.join(', ')
  } catch (err) {
    console.error('Помилка загрузки поста', err)
    alert('Помилка загрузки поста')
    router.push('/')
  }
})

// Зберегаємо зміни
async function savePost() {
  const data = new FormData()
  data.append('title', form.value.title)
  data.append('description', form.value.description)
  data.append('content', form.value.content)

  const tags = tagsInput.value
    .split(',')
    .map((tag: string) => tag.trim())
    .filter(Boolean)
  tags.forEach(tag => data.append('tags', tag))

  if (form.value.image) {
    data.append('image', form.value.image)
  }

  try {
    await $fetch(`${apiBase}/posts/${slug}/`, {
      method: 'PATCH',
      body: data,
      headers: {
        Authorization: auth.token.value || '',
      },
    })

    router.push(`/posts/${slug}`)
  } catch (err) {
    console.error('Помилка при збереженні:', err)
    alert('Невдалося зберегти пост')
  }
}
</script>
