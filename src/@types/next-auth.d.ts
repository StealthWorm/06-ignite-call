// por mais que não use esse import precisamos declarar, para dizer que nao queremos sobrescrever mas extender
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth'

declare module 'next-auth' {
  // por padrão AdapterUser do Next tem image e não avatar_url, estamos mudando esse comportamento aqui
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
