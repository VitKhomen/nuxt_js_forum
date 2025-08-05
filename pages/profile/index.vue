<script setup lang="ts">
// pages/profile/index.vue -> <script setup lang="ts">

import { useProfileStore } from '@/stores/useProfile'
import { usePostsStore } from '@/stores/usePosts'
import { onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Инициализируем сторы
const profileStore = useProfileStore()
const postsStore = usePostsStore()

const route = useRoute()
const router = useRouter()
const auth = useAuth()

// 1. Получаем номер текущей страницы из URL. По умолчанию — 1.
const page = computed(() => parseInt(route.query.page as string || '1'))

// 2. Вычисляем общее количество страниц, используя данные из стора
const pageSize = 6;
const totalPages = computed(() => Math.ceil(postsStore.totalCount / pageSize))

// 3. Следим за изменением страницы в URL и вызываем экшен стора
watch(page, (newPage) => {
  // Загружаем посты для новой страницы, только если профиль уже загружен
  if (profileStore.profile?.username) {
    postsStore.fetchUserPosts(profileStore.profile.username, newPage)
  }
}, { immediate: true }) // immediate: true - чтобы watch сработал сразу при загрузке компонента

// 4. Загружаем данные самого профиля при монтировании
onMounted(async () => {
  await auth.getSession()
  if (auth.status.value !== 'authenticated') {
    return router.push('/login')
  }

  await profileStore.fetchProfile(auth)

  // После загрузки профиля, watch выше уже должен был запустить загрузку постов
  // для первой страницы. Если нет, можно добавить вызов здесь.
  if (profileStore.profile?.username && postsStore.posts.length === 0) {
     await postsStore.fetchUserPosts(profileStore.profile.username, page.value)
  }
})

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('uk-UA')
}

function goToPage(pageNumber: number) {
  if (pageNumber < 1 || pageNumber > totalPages.value) return;
  router.push({ query: { page: pageNumber } })
}
</script>

<template>
  <div class="container mt-5">
    <!-- Пока профиль не загружен -->
    <div v-if="!profileStore.profile">
      <p class="text-center">Загрузка профиля...</p>
    </div>

    <!-- После загрузки профиля -->
    <div v-else>
      <div class="card shadow-sm p-4 rounded-4">
        <div class="row align-items-center">
          <div class="col-md-3 text-center">
            <img
              :src="profileStore.profile.avatar"
              class="rounded-circle img-fluid border"
              style="width: 150px;"
              alt="Аватар"
            />
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

      <section class="all-posts">
        <div class="container">
          <h3 class="my-4 text-center">Мои посты</h3>
          <div class="row">
            <div
              v-for="post in postsStore.posts"
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
          </div>
        </div>
      </section>
    </div>
    <div v-if="totalPages > 1" class="row mt-4">
  <div class="col-12">
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: !postsStore.prevPageUrl }">
          <a class="page-link" href="#" @click.prevent="goToPage(page - 1)">Назад</a>
        </li>

        <li v-for="p in totalPages" :key="p" class="page-item" :class="{ active: p === page }">
          <a class="page-link" href="#" @click.prevent="goToPage(p)">{{ p }}</a>
        </li>

        <li class="page-item" :class="{ disabled: !postsStore.nextPageUrl }">
          <a class="page-link" href="#" @click.prevent="goToPage(page + 1)">Вперед</a>
        </li>
      </ul>
    </nav>
  </div>
</div>
  </div>
</template>