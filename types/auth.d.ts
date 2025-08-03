// types/auth.d.ts

/// <reference types="nuxt" />

import 'next-auth'

declare module 'next-auth' {
  /**
   * Расширяем стандартную сессию, чтобы включить наши кастомные поля
   */
  interface Session {
    // Структура `user` теперь соответствует тому, что у тебя в конфиге
    user?: {
      id: string | number;
      username: string;
      email: string;
    }
  }
}