<template>
  <section class="my-contact-form">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12">
          <!-- Хлебные крошки -->
          <nav aria-label="breadcrumb" class="my-4">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <NuxtLink to="/">Главная</NuxtLink>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Регистрация</li>
            </ol>
          </nav>

          <div class="row justify-content-center">
            <div class="col-6">
              <p class="lead">Заполните форму для регистрации нового пользователя</p>

              <form @submit.prevent="handleSubmit">
                <div class="mb-3" v-for="(value, field) in formData" :key="field">
                  <label :for="field" class="form-label">{{ fieldLabels[field] }}</label>
                  <input
                    v-model="formData[field]"
                    :id="field"
                    :name="field"
                    class="form-control"
                    :type="fieldTypes[field] || 'text'"
                  />

                  <div
                    v-if="errors[field]"
                    class="alert alert-danger py-1 px-2 my-error"
                  >
                    {{ errors[field] }}
                  </div>
                </div>

                <button type="submit" class="btn btn-success">✅ Зарегистрироваться</button>
              </form>

              <div v-if="serverError" class="alert alert-danger mt-3">
                {{ serverError }}
              </div>

              <div v-if="success" class="alert alert-success mt-3">
                Регистрация прошла успешно! Теперь вы можете войти.
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useFetch, useRuntimeConfig } from '#imports'
import { navigateTo } from '#app'

const config = useRuntimeConfig()

const formData = ref({
  username: '',
  email: '',
  password: '',
  confirm_password: '',
})

const errors = ref({})
const serverError = ref('')
const success = ref(false)

const fieldLabels = {
  username: 'Имя пользователя',
  email: 'Email',
  password: 'Пароль',
  confirm_password: 'Подтвердите пароль'
}

const fieldTypes = {
  email: 'email',
  password: 'password',
  confirm_password: 'password'
}

const handleSubmit = async () => {
  errors.value = {}
  serverError.value = ''
  success.value = false

  try {
    const { data, error } = await useFetch(`${config.auth.baseURL}/api/register/`, {
      method: 'POST',
      body: { ...formData.value }
    })

    if (error.value) {
      if (error.value.statusCode === 400 && error.value.data) {
        errors.value = error.value.data
      } else {
        serverError.value = 'Ошибка регистрации. Попробуйте позже.'
      }
    } else {
      success.value = true
      // Можешь редиректить после успешной регистрации:
      // await navigateTo('/login')
    }
  } catch (err) {
    serverError.value = 'Сетевая ошибка'
  }
}
</script>

<style scoped>
.my-error {
  font-size: 0.9rem;
}
</style>