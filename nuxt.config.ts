
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@sidebase/nuxt-auth',
    '@pinia/nuxt',
  ],

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

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_AUTH_BASE_URL,
    },
  },

  
  auth: {
    globalAppMiddleware: false,
    baseURL: process.env.NUXT_PUBLIC_AUTH_BASE_URL,
    provider: {
      type: 'local',
      token: {
        signInResponseTokenPointer: '/access',
        type: 'Bearer',
        cookieName: 'auth.access-token',
        headerName: 'Authorization',
        maxAgeInSeconds: 1800,
        sameSiteAttribute: 'lax',
        secureCookieAttribute: false,
        httpOnlyCookieAttribute: false,
      },
      refresh: {
        isEnabled: true,
        endpoint: { path: '/refresh_token/', method: 'post' },
        refreshOnlyToken: true,
        token: {
          signInResponseRefreshTokenPointer: '/refresh',
          refreshResponseTokenPointer: '/access',
          refreshRequestTokenPointer: '/refresh',
          cookieName: 'auth.refresh-token',
          maxAgeInSeconds: 86400,
          sameSiteAttribute: 'lax',
          secureCookieAttribute: false,
          httpOnlyCookieAttribute: false,
        }
      },
      endpoints: {
        signIn: { path: '/token/', method: 'POST' },
        signOut: { path: '/logout/', method: 'POST' },
        signUp: { path: '/register/', method: 'POST' },
        getSession: { path: '/profile/', method: 'GET' }
      },
      pages: {
        login: '/login',
      },
      
    }
  }
})