<template>
  <div>
    <Header :title="post?.title" />
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <div class="card shadow-sm mb-4 mt-4">
            <img :src="post.image" alt="Изображение поста" class="card-img-top" />
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
                  <NuxtLink to="/" class="btn btn-secondary">На главную</NuxtLink>
                  
                  <!-- Показывать кнопки только если пользователь автор -->
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
</template>

<script setup>
import { useRoute } from 'vue-router'
import Header from '~/components/Header.vue'
import Aside from '~/components/Aside.vue'
import { useBlogStore } from '~/stores/blog'

const auth = useAuth()
const authUser = auth.data.value?.user.username
const route = useRoute()
const router = useRouter()
const postSlug = route.params.slug
const config = useRuntimeConfig()

// Получаем пост
const { data: postData } = await useFetch(`${config.public.apiBase}/posts/${postSlug}/`)
const post = postData.value

// Загружаем данные aside через хранилище
const blogStore = useBlogStore()
await blogStore.fetchAsideData()

async function deletePost() {
  // ++ Добавляем подтверждение перед удалением
  if (confirm('Ви впевнені, що хочете видалити цей пост?')) {
    try {
      await $fetch(`${config.public.apiBase}/posts/${postSlug}/`, {
        method: 'DELETE',
        headers: {
          Authorization: auth.token.value || '',
        },
      })

      // ++ Используем router.push и перенаправляем на главную
      alert('Пост успішно видалено!')
      router.push('/') 

    } catch (err) {
      console.error('Помилка видалення:', err)
      alert('Не вдалося видалити пост')
    }
  }
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('ru-RU')
}
</script>