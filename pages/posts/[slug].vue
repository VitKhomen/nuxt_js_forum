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
                  <!-- <template v-if="authUser && authUser === post.author">
                  <NuxtLink :to="`/posts/update/${post.slug}`" class="btn btn-warning">✏️ Изменить</NuxtLink>
                  <NuxtLink :to="`/posts/delete/${post.slug}`" class="btn btn-danger ms-auto">Удалить пост</NuxtLink>
                </template> -->
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

const route = useRoute()
const postSlug = route.params.slug

// Получаем пост
const { data: postData } = await useFetch(`http://127.0.0.1:8000/api/posts/${postSlug}`)
const post = postData.value

// Загружаем данные aside через хранилище
const blogStore = useBlogStore()
await blogStore.fetchAsideData()

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('ru-RU')
}
</script>