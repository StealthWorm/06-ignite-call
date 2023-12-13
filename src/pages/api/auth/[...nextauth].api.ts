import { PrismaAdapter } from '@/lib/auth/prisma-adapter'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      // escopo de autorização para acessos
      authorization: {
        params: {
          scope:
            'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar',
        },
      },
    }),
  ],
  // funções que são chamadas em momentos comuns, como situações de login, redirect, session, jwt
  callbacks: {
    async signIn({ account }) {
      if (
        !account?.scope?.includes('https://www.googleapis.com/auth/calendar')
      ) {
        // enviando parametro de erros para reaproveitar o fluxo, ao inves de criar outra pagina
        return '/register/connect-calendar?error=permissions'
      }

      return true
    },
  },
}

export default NextAuth(authOptions)
