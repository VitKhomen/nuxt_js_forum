<template>
  <div>
    <Header :title="'Написати мені'" />

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8">
          <p class="lead">Чтобы связаться со мной, заполните форму обратной связи</p>

          <!-- Форма -->
          <form @submit.prevent="submitForm">
            <!-- Имя -->
            <div class="mb-3">
              <label for="name">Имя</label>
              <input
                v-model="form.name"
                id="name"
                type="text"
                class="form-control"
              />
              <div v-if="errors.name" class="alert alert-danger">{{ errors.name }}</div>
            </div>

            <!-- Email -->
            <div class="mb-3">
              <label for="email">Email</label>
              <input
                v-model="form.email"
                id="email"
                type="email"
                class="form-control"
              />
              <div v-if="errors.email" class="alert alert-danger">{{ errors.email }}</div>
            </div>

            <!-- Тема -->
            <div class="mb-3">
              <label for="subject">Тема</label>
              <input
                v-model="form.subject"
                id="subject"
                type="text"
                class="form-control"
              />
              <div v-if="errors.subject" class="alert alert-danger">{{ errors.subject }}</div>
            </div>

            <!-- Сообщение -->
            <div class="mb-3">
              <label for="message">Сообщение</label>
              <textarea
                v-model="form.message"
                id="message"
                rows="5"
                class="form-control"
              ></textarea>
              <div v-if="errors.message" class="alert alert-danger">{{ errors.message }}</div>
            </div>

            <!-- Кнопка -->
            <button type="submit" class="btn btn-primary">Отправить</button>
          </form>

          <!-- Сообщение об успехе -->
          <div v-if="successMessage" class="alert alert-success mt-4">
            {{ successMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue'
import { ref } from 'vue'

// Модель формы
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const config = useRuntimeConfig() // Получаем доступ к конфигу
const apiBase = config.public.apiBase // Наш базовый URL

// Ошибки и сообщение
const errors = ref({})
const successMessage = ref('')

// Отправка формы
async function submitForm() {
  // Очищаем перед новой попыткой
  errors.value = {}
  successMessage.value = ''

  try {
    await $fetch(`${apiBase}/contacts/`, {
      method: 'POST',
      body: form.value,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Успех
    successMessage.value = 'Сообщение успешно отправлено!'
    form.value = { name: '', email: '', subject: '', message: '' }
  } catch (err) {
    // Обработка ошибок валидации от DRF
    if (err?.data) {
      errors.value = err.data
    } else {
      errors.value = { general: 'Что-то пошло не так. Попробуйте снова.' }
    }
  }
}
</script>

<style scoped>

</style>