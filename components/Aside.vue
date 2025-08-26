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

    <!-- Останні статі -->
    <h5 class="card-header">Останні Пости</h5>
    <div
      v-for="post in posts"
      :key="post.slug"
      class="card"
    >
      <NuxtLink :to="`/posts/${post.slug}`">
        <img :src="post.image" alt="Зображення поста" class="card-img-top" />
      </NuxtLink>
      <div class="card-body">
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text" v-html="post.description"></p>
        <NuxtLink :to="`/posts/${post.slug}`" class="card-link">Посилання на статю</NuxtLink>
      </div>
    </div>

    <div v-if="!posts?.length" class="col-12 text-center">Нема постів для відображення.</div>
  </div>
</template>

<script setup>
defineProps({
  tags: Array,
  posts: Array,
})
</script>

<style scoped>

</style>