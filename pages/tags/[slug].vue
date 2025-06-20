<template>
  <div>
    <Header :title="tagName"/>
    <div class="container">
      <div v-if="posts.length">
        <div v-for="post in posts" :key="post.slug" class="mb-4">
          <NuxtLink :to="`/posts/${post.slug}`">
            <h3>{{ post.title }}</h3>
          </NuxtLink>
          <p v-html="post.description"></p>
        </div>
      </div>
      <div v-else>
        <p>Нет постов с этим тегом.</p>
      </div>
    </div>
  </div>
  </template>

<script setup>
import { useRoute } from 'vue-router'
import Header from '~/components/Header.vue'

const route = useRoute()
const tagSlug = route.params.slug

const { data } = await useFetch(`http://127.0.0.1:8000/api/tags/${tagSlug}`)
const posts = data.value?.results || []
const tagName = `Пошук по тегу #${tagSlug}`
</script>