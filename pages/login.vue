<template>
  <div>
    <Header :title="'Вхід до акаунта'" />
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-6">
          <div v-if="error" class="alert alert-danger">
            {{ error }}
          </div>

          <form @submit.prevent="login">
            <div class="mb-3">
              <label for="username" class="form-label">Ім'я користувача</label>
              <input
                v-model="username"
                type="text"
                id="username"
                class="form-control"
                placeholder="Введіть ім'я"
                required
              />
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Пароль</label>
              <input
                v-model="password"
                type="password"
                id="password"
                class="form-control"
                placeholder="Введіть пароль"
                required
              />
            </div>

            <button type="submit" class="btn btn-success">Вхід</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '#imports'
import Header from '~/components/Header.vue'

definePageMeta({
  auth: false 
})

const username = ref('')
const password = ref('')
const error = ref<string | null>(null)

const router = useRouter()
const { signIn, status, token, data } = useAuth()

const login = async () => {
  error.value = null;

  try {
    await signIn({
      username: username.value,
      password: password.value,
    }, 
    { 
      callbackUrl: '/' // Явно указываем URL для перенаправления
    });

    // Строка с navigateTo('/') здесь больше не нужна.

  } catch (err) {
    error.value = 'Невірний логін або пароль. Спробуйте ще раз.';
    console.error('Login error:', err);
  }
};

// Автопереход при аутентификации (если уже залогинен)
watch(status, (newStatus) => {
  if (newStatus === 'authenticated') {
    router.push('/')
  }
})
</script>