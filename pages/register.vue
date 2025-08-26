<template>
  <div>
    <Header :title="'Вхід до акаунта'" />
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="row justify-content-center">
            <div class="col-6">
              <p class="lead">Заповніть форму для реєстрації нового користувача</p>

              <form @submit.prevent="handleSubmit">
                <!-- Текстовые поля -->
                <template v-for="(value, field) in formData" :key="field">
                  <div class="mb-3" v-if="field !== 'avatar'">
                    <label :for="field" class="form-label">{{ fieldLabels[field] }}</label>
                      <input
                        v-model="formData[field]"
                          :id="field"
                          :name="field"
                          class="form-control"
                          :type="fieldTypes[field] || 'text'"
                      />
                    <div v-if="errors[field]" class="alert alert-danger py-1 px-2 my-error">
                       {{ errors[field] }}
                    </div>
                  </div>
                </template>

                <!-- Поле для аватара -->
                <div class="mb-3">
                  <label for="avatar" class="form-label">Аватар</label>
                  <input
                    type="file"
                    id="avatar"
                    class="form-control"
                    accept="image/*"
                    @change="onFileChange"
                  />
                  <div v-if="errors.avatar" class="alert alert-danger py-1 px-2 my-error">
                    {{ errors.avatar }}
                  </div>
                </div>

                <!-- Кнопка -->
                <button type="submit" class="btn btn-success">✅ Зареструватися</button>
              </form>

              <!-- Сообщения об ошибке и успехе -->
              <div v-if="serverError" class="alert alert-danger mt-3">
                {{ serverError }}
              </div>

              <div v-if="success" class="alert alert-success mt-3">
                Регістрація пройшла успішно! Тепер ви можете увійти.
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '#imports'
import Header from '~/components/Header.vue'

const { signUp, signIn } = useAuth()

const formData = ref({
  username: '',
  email: '',
  password: '',
  password2: '',
  avatar: null,
})

const errors = ref({})
const serverError = ref('')
const success = ref(false)
const config = useRuntimeConfig()
const apiBase = config.public.apiBase 


const fieldLabels = {
  username: 'Ім’я користувача',
  email: 'Емейл',
  password: 'Пароль',
  password2: 'Підтвердіть пароль'
}

const fieldTypes = {
  email: 'email',
  password: 'password',
  password2: 'password'
}

// Загрузка файла
const onFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    formData.value.avatar = file
  }
}

// Відправка формы
const handleSubmit = async () => {
  errors.value = {}
  serverError.value = ''
  success.value = false

  try {
    const payload = new FormData()
    for (const key in formData.value) {
      if (formData.value[key]) {
        payload.append(key, formData.value[key])
      }
    }

    const response = await fetch(`${apiBase}/register/`, {
      method: 'POST',
      body: payload,
    })

    const data = await response.json()

    if (!response.ok) {
      if (response.status === 400) {
        errors.value = data
      } else {
        serverError.value = 'Помилка реєстрації. Спробуйте пізніше.'
      }
      return
    }

    // Автоматично логінім:
    await signIn({
      username: formData.value.username,
      password: formData.value.password
    }, { callbackUrl: '/' })

  } catch (err) {
    serverError.value = 'Мережева помилка. Спробуйте пізніше.'
    console.error('Registration error:', err)
  }
}
</script>

<style scoped>
.my-error {
  font-size: 0.9rem;
}
</style>