<template>
  <div v-if="post">
    <Header :title="post?.title" />
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <div class="card shadow-sm mb-4 mt-4">
            <img :src="post.image" alt="Зображення поста" class="card-img-top" />
            <div class="card-body-detail d-flex flex-column">
              <p class="post-text" v-html="post.content"></p>
              <p class="text-muted">Автор: {{ post.author }}</p>
              <small class="text-muted">{{ formatDate(post.created_at) }}</small>
              <div class="d-flex flex-wrap gap-1 mb-2">
                <NuxtLink
                  v-for="tag in post.tags"
                  :key="tag"
                  :to="`/tags/${tag}`"
                  class="badge bg-info text-dark"
                  >
                  #{{ tag }}
                </NuxtLink>
              </div>
              
              <div class="mt-auto d-flex justify-content-between align-items-center">
                <div class="d-flex flex-wrap gap-2 mt-3">
                  <NuxtLink to="/" class="btn btn-secondary">На головну</NuxtLink>
                  
                  <template v-if="authUser === post.author">
                  <NuxtLink :to="`/posts/edit/${post.slug}`" class="btn btn-warning">✏️ Змінити</NuxtLink>
                  <button @click="deletePost()" class="btn btn-danger ms-auto">🗑️ Видалити пост</button>
                  </template>
              </div>
            </div>
            
          </div>
        </div>
        <Comments />
      </div>
      <Aside :tags="blogStore.tags" :posts="blogStore.latestPosts" />
    </div>
  </div>
</div>
<div v-else-if="error">
  <p>Не вдалося завантажити пост. Будьласка, спробуйте пізніше.</p>
</div>
<div v-else>
  <p>Загрузка...</p>
</div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Header from '~/components/Header.vue'
import Aside from '~/components/Aside.vue'
import { useBlogStore } from '~/stores/blog'
import { computed } from 'vue'

const auth = useAuth()
const authUser = computed(() => auth.data.value?.user.username)
const route = useRoute()
const router = useRouter()
const postSlug = route.params.slug
const config = useRuntimeConfig()
const apiBase = config.public.apiBase
const url = useRequestURL()


const { data: post, error } = await useFetch(`${apiBase}/posts/${postSlug}/`)


const blogStore = useBlogStore()
await blogStore.fetchAsideData()

async function deletePost() {
  
  if (confirm('Ви впевнені, що хочете видалити цей пост?')) {
    try {
      await $fetch(`${apiBase}/posts/${postSlug}/`, {
        method: 'DELETE',
        headers: {
          Authorization: auth.token.value || '',
        },
      })

      
      alert('Пост успішно видалено!')
      await navigateTo('/')

    } catch (err) {
      console.error('Помилка видалення:', err)
      alert('Не вдалося видалити пост')
    }
  }
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('ru-RU')
}

useHead(() => {
  if (!post.value) {
    return { title: 'Загрузка...' }
  }
  return {
    title: post.value.title,
    meta: [
      { name: 'description', content: post.value.description || post.value.content.slice(0, 160) },
      { name: 'keywords', content: post.value.tags?.join(', ') || '' },
      { property: 'og:title', content: post.value.title },
      { property: 'og:description', content: post.value.description || post.value.content.slice(0, 160) },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: url.href }, 
      { property: 'og:image', content: post.value.image },
      
    ],
    link: [
      { rel: 'canonical', href: url.href } 
    ]
  }
})
</script>