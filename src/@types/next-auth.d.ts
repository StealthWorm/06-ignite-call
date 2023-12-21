import NextAuth from 'next-auth'

declare module 'next-auth' {
  export interface User {
    id: string
    name: string
    email: string
    username: string
    avatar_url: string
  }

  // interfaces funcionam como extensão de uma interface já existente, no caso, a Session não sobrescreve a interface ja existente dentro do next-auth, apenas adiciona dados a ela
  interface Session {
    user: User
  }
}
