// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '~/assets/css/style.css'
  ],

  app: {
    head: {
      title: 'my_nuxtjs_forum',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
    },
  },
});
