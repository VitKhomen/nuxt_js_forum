<template>
  <section class="all-posts">
    <div class="container">
      <h1 class="my-4 text-center">Последние записи блога</h1>
      <div class="row">
        <div
          v-if="posts.length"
          v-for="post in posts"
          :key="post.slug"
          class="col-md-4"
        >
          <div class="card mb-4 shadow-sm">
            <NuxtLink :to="`/posts/${post.slug}`">
              <img
                :src="post.image"
                alt="Изображение поста"
                class="card-img-top"
              />
            </NuxtLink>
            <div class="card-body">
              <h4 class="card-title">{{ post.title }}</h4>
              <div class="card-text" v-html="post.description"></div>
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
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <NuxtLink
                    :to="`/posts/${post.slug}`"
                    class="btn btn-sm btn-outline-secondary"
                  >
                    Подробнее
                  </NuxtLink>
                </div>
                <small class="text-muted">
                  {{ formatDate(post.created_at) }}
                </small>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="col-12">
          <p class="text-center">Нет постов для отображения.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Автоматически доступен useFetch в Nuxt 3+
const { data: postsData, pending, error } = await useFetch('http://127.0.0.1:8000/api/posts/')
const posts = postsData.value?.results || []
const props = defineProps({
  posts: {
    type: Array,
    default: () => [],
  },
})

// Форматирование даты
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('ru-RU')
}
</script>

<style scoped>

</style>
