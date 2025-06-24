<template>
  <div>
    <Header :title="`Знайдено ${posts.length} постів по запиту: '${q}'`" />

    <div class="container mt-4">
      <div v-if="pending">Загрузка...</div>
      <div v-else-if="error">Ошибка загрузки :(</div>
      <div v-else-if="!posts.length">Ничего не найдено</div>

      <div class="row">
        <div
          class="col-lg-12 mb-3"
          v-for="post in posts"
          :key="post.slug"
        >
          <h5 class="card-title">{{ post.title }}</h5>
          <p class="card-text" v-html="post.description"></p>
          <NuxtLink :to="`/posts/${post.slug}`" class="card-link">Читать статью</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, watchEffect, computed } from 'vue'
import Header from '~/components/Header.vue'

const route = useRoute()
const q = computed(() => route.query.q || '')

const postsData = ref(null)
const error = ref(null)
const pending = ref(false)

watchEffect(async () => {
  if (!q.value) {
    postsData.value = { results: [] }
    return
  }

  pending.value = true
  error.value = null
  try {
    const { data } = await useFetch(`http://127.0.0.1:8000/api/posts/?search=${encodeURIComponent(q.value)}`, { key: q.value }) // ключ важен
    postsData.value = data.value
  } catch (e) {
    error.value = e
  } finally {
    pending.value = false
  }
})

const posts = computed(() => postsData.value?.results || [])
</script>