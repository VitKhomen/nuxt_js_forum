<template>
  <div class="col-md-4">

    <!-- Популярные теги -->
    <div class="card my-4">
      <h5 class="card-header">Популярні Тегі</h5>
      <div class="card-body">
        <div v-if="tags.length" class="d-flex flex-wrap">
          <NuxtLink
            v-for="tag in tags"
            :key="tag.name"
            :to="`/tags/${tag.name}`"
            class="m-2 h5 text-primary"
          >
            #{{ tag.name }}
          </NuxtLink>
        </div>
        <div v-else class="col-12 text-center">Немає тегів</div>
      </div>
    </div>

    <!-- Последние статьи -->
    <div
      v-for="post in posts"
      :key="post.slug"
      class="card my-4"
    >
      <h5 class="card-header">Последние статьи</h5>
      <NuxtLink :to="`/posts/${post.slug}`">
        <img :src="post.image" alt="Изображение поста" class="card-img-top" />
      </NuxtLink>
      <div class="card-body">
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text" v-html="post.description"></p>
        <NuxtLink :to="`/posts/${post.slug}`" class="card-link">Ссылка на статью</NuxtLink>
      </div>
    </div>

    <div v-if="!posts?.length" class="col-12 text-center">Нет постов для отображения.</div>
  </div>
</template>

<script setup>
const { data: tagsData } = await useFetch('http://127.0.0.1:8000/api/tags')
const { data: postsData } = await useFetch('http://127.0.0.1:8000/api/aside')

const tags = tagsData.value || []
const posts = postsData.value || []

</script>

<style scoped>

</style>