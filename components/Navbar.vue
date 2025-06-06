<template>
  <section class="my-navigation">
    <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top" data-bs-theme="dark">
      <div class="container-fluid">
        <NuxtLink to="/" class="navbar-brand">
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" width="30" height="30" alt="Python" />
        </NuxtLink>
        <NuxtLink to="/" class="navbar-brand">
          <img src="/img/001.png" width="30" height="30" alt="Corgi" title="Corgi" />
        </NuxtLink>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="navbar-nav me-auto mb-2 mb-lg-0">
            <NuxtLink to="/" class="nav-link active">Главная</NuxtLink>
            <NuxtLink to="/contact" class="nav-link active">Контакты</NuxtLink>
          </div>

          <div class="d-flex align-items-center">
            <form class="d-flex align-items-center" @submit.prevent="search">
              <input v-model="q" class="form-control me-2" type="search" placeholder="Поиск..." />
              <button class="btn btn-outline-success me-2" type="submit">Найти</button>
            </form>

            <div class="d-flex align-items-center flex-wrap justify-content-end text-center mb-2">
              <template v-if="user">
                <span class="navbar-text me-2 text-white">
                  Привет, {{ user.username }}!
                </span>
                <!-- <NuxtLink to="/posts/create" class="btn btn-outline-light btn-sm me-2">+ Пост</NuxtLink>
                <NuxtLink :to="`/profile/${user.username}`" class="btn btn-outline-light btn-sm me-2">Профиль</NuxtLink> -->
                <button to="/signout" class="btn btn-outline-light btn-sm me-2">Выход</button>
              </template>

              <template v-else>
                <NuxtLink to="/signin" class="btn btn-outline-light btn-sm me-2">Вход</NuxtLink>
                <NuxtLink to="/signup" class="btn btn-outline-light btn-sm me-2">Регистрация</NuxtLink>
              </template>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Управление раскрытием меню
const menuOpen = ref(false);
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// Поисковый ввод
const q = ref('');
const router = useRouter();

const search = () => {
  if (q.value.trim()) {
    router.push(`/search?q=${encodeURIComponent(q.value)}`);
  }
};

// 🔔 Пример заглушки юзера (в реальности — использовать useAuth() или Vuex/pinia)
const user = ref({
  username: 'Crowz',
  url: 'crowz',
});

// Логаут (заглушка)
const logout = () => {
  alert('Пользователь вышел');
  // Очистить токены и перенаправить, например: router.push('/login')
};
</script>

<style scoped>
/* Тебе можно оставить Bootstrap, но при желании сюда подключаются и кастомные стили */
</style>