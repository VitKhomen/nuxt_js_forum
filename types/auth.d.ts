// types/auth.d.ts

/// <reference types="nuxt" />

import 'next-auth'

declare module 'next-auth' {
  /**
   * Росширюєм нашу сесію
   */
  interface Session {
    // Структура `user` 
    user?: {
      id: string | number;
      username: string;
      email: string;
    }
  }
}