
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

  
  auth: {
    baseURL: process.env.NUXT_PUBLIC_AUTH_BASE_URL,
    provider: {
      type: 'local',
      token: {
        signInResponseTokenPointer: '/access',
        type: 'Bearer',
        cookieName: 'auth.token',
        headerName: 'Authorization',
        maxAgeInSeconds: 1800,
        sameSiteAttribute: 'lax',
        secureCookieAttribute: false,
        httpOnlyCookieAttribute: false,
      },
      refresh: {
        isEnabled: false,
        endpoint: { path: '/api/refresh-token/', method: 'post' },
        refreshOnlyToken: true,
        token: {
          signInResponseRefreshTokenPointer: '/refresh',
          refreshResponseTokenPointer: '/access',
          refreshRequestTokenPointer: '/refresh',
          cookieName: 'auth.token',
          maxAgeInSeconds: 1800,
          sameSiteAttribute: 'lax',
          secureCookieAttribute: false,
          httpOnlyCookieAttribute: false,
        }
      },
      endpoints: {
        signIn: { path: '/api/token/', method: 'post' },
        signOut: { path: '/api/logout/', method: 'post' },
        signUp: { path: '/api/register/', method: 'post' },
        getSession: { path: '/api/profile/', method: 'get' }
      },
      pages: {
        login: '/login'
      },
      session: {
        dataType: {
          user: {
            id: 'string | number',
            username: 'string',
            email: 'string',
          },
        },
      },
    }
  }
})