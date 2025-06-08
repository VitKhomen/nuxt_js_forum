<template>
  <div class="container">
    <h1 class="my-4">Посты по тегу: {{ tagName }}</h1>

    <div v-if="posts.length">
      <div v-for="post in posts" :key="post.slug" class="mb-4">
        <NuxtLink :to="`/posts/${post.slug}`">
          <h3>{{ post.title }}</h3>
        </NuxtLink>
        <p>{{ post.description.slice(0, 200) }}...</p>
      </div>
    </div>
    <div v-else>
      <p>Нет постов с этим тегом.</p>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const tagSlug = route.params.slug

const { data } = await useFetch(`http://127.0.0.1:8000/api/posts/?tag=${tagSlug}`)
const posts = data.value?.results || []
const tagName = tagSlug // или заменить на нормальное имя, если есть отдельный API для тега
</script>