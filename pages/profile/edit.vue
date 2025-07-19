<script setup lang="ts">
import { useProfileStore } from '@/stores/useProfile'


const profileStore = useProfileStore()
if (!profileStore.profile?.username) {
  await profileStore.fetchProfile()
}

const form = reactive({
  username: profileStore.profile.username,
  email: profileStore.profile.email,
  avatar: null as File | null
})

const router = useRouter()

async function saveProfile() {
  const data = new FormData()
  data.append('username', form.username)
  data.append('email', form.email)
  if (form.avatar) {
    data.append('avatar', form.avatar)
  }

  await profileStore.updateProfile(data)
  router.push('/profile')
}
</script>

<template>
  <div class="container mt-5">
    <h1>Редактирование профиля</h1>
    <p class="text-danger">Вы на странице РЕДАКТИРОВАНИЯ.</p>
    <form @submit.prevent="saveProfile">
      <div class="mb-3">
        <label class="form-label">Имя пользователя</label>
        <input v-model="form.username" class="form-control" />
      </div>

      <div class="mb-3">
        <label class="form-label">Email</label>
        <input v-model="form.email" class="form-control" type="email" />
      </div>

      <div class="mb-3">
        <label class="form-label">Аватар</label>
        <input type="file"
               @change="e => form.avatar = e.target.files[0]"
               class="form-control" />
      </div>

      <button type="submit" class="btn btn-success">Сохранить</button>
    </form>
  </div>
</template>