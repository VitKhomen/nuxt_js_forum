<script setup lang="ts">
import { useProfileStore } from '@/stores/useProfile'
import { usePostsStore } from '@/stores/usePosts'

const profileStore = useProfileStore()
const postsStore = usePostsStore()

await profileStore.fetchProfile()
await postsStore.fetchUserPosts(profileStore.profile?.username)

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('ru-RU')
}
</script>

<template>
  <div class="container mt-5">
    <div class="card shadow-sm p-4 rounded-4">
      <div class="row align-items-center">
        <div class="col-md-3 text-center">
          <img :src="profileStore.profile.avatar"
               class="rounded-circle img-fluid border"
               style="width: 150px;"
               alt="Аватар" />
        </div>
        <div class="col-md-9">
          <h2>Привет, {{ profileStore.profile.username }}!</h2>
          <p><strong>Email:</strong> {{ profileStore.profile.email }}</p>
          <NuxtLink to="/profile/edit" class="btn btn-primary mt-3">
            Редактировать профиль
          </NuxtLink>
        </div>
      </div>
    </div>
    </div>

  <section class="all-posts">
    <div class="container">
      <h3 class="my-4 text-center">Мои посты</h3>
    <div class="row">
      <div v-for="post in postsStore.posts" :key="post.slug" class="col-md-4">
        <div class="card mb-4 shadow-sm">
          <NuxtLink :to="`/posts/${post.slug}`">
            <img :src="post.image" class="card-img-top" alt="..." />
          </NuxtLink>
          <div class="card-body">
            <h5>{{ post.title }}</h5>
            <p v-html="post.description"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>