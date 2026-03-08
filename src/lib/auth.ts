import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { auth } from '@/lib/supabase'

export const { handlers, signIn, signOut, auth: nextAuth } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: '邮箱', type: 'email' },
        password: { label: '密码', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        try {
          const { user } = await auth.signIn(credentials.email as string, credentials.password as string)
          return {
            id: user.id,
            email: user.email,
            name: user.user_metadata?.nickname,
          }
        } catch (error) {
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})
