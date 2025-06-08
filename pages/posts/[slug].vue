<template>
  <div>
    <h1>{{ post.title }}</h1>
    <p v-html="post.content"></p>
  </div>
</template>

<script setup>
const route = useRoute()

// Запрос по слагу, например: /posts/my-slug
const { data: postData, error } = await useFetch(`http://127.0.0.1:8000/api/posts/${route.params.slug}`)
const post = postData.value
</script>