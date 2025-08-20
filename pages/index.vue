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
      <div v-if="totalPages > 1" class="row mt-4">
  <div class="col-12">
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: !data?.previous }">
          <a class="page-link" href="#" @click.prevent="goToPage(page - 1)">Назад</a>
        </li>

        <li
          v-for="p in totalPages"
          :key="p"
          class="page-item"
          :class="{ active: p === page }"
        >
          <a class="page-link" href="#" @click.prevent="goToPage(p)">{{ p }}</a>
        </li>

        <li class="page-item" :class="{ disabled: !data?.next }">
          <a class="page-link" href="#" @click.prevent="goToPage(page + 1)">Вперед</a>
        </li>
      </ul>
    </nav>
  </div>
</div>
    </div>
  </section>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const config = useRuntimeConfig() // Получаем доступ к конфигу
const apiBase = config.public.apiBase // Наш базовый URL
const route = useRoute()
const router = useRouter()

// 1. Получаем номер текущей страницы из URL. По умолчанию — 1.
const page = computed(() => parseInt(route.query.page || '1'))

// 2. Формируем URL для API, включая номер страницы.
const apiUrl = computed(() => `${apiBase}/posts/?page=${page.value}`)

// 3. Выполняем запрос. Nuxt автоматически перезапросит данные, когда apiUrl изменится.
const { data, pending, error } = await useFetch(apiUrl, {
  // `watch` явно указывает Nuxt следить за изменением страницы
  watch: [page]
})

// 4. Извлекаем данные из ответа API. Ответ DRF содержит count, next, previous, results
const posts = computed(() => data.value?.results || [])
const totalCount = computed(() => data.value?.count || 0)

// 5. Вычисляем общее количество страниц для отображения кнопок
const pageSize = 6; // Это значение из вашего бэкенда
const totalPages = computed(() => Math.ceil(totalCount.value / pageSize))

// 6. Функция для форматирования даты
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('uk-UA')
}

// 7. Функция для перехода на другую страницу
function goToPage(pageNumber) {
  router.push({ query: { page: pageNumber } })
}

useHead({
  title: 'Главная страница форума',
  meta: [
    { name: 'description', content: 'Гловна сторінка.' },
    { name: 'keywords', content: 'блог, nuxt, форум, пупупу' },
  ],
  link: [
    { rel: 'canonical', href: 'http://localhost:8000/' }
  ]
})
</script>

<style scoped>

</style>
