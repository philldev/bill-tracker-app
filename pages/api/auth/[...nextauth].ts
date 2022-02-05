import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import db from '../../../lib/db'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export default NextAuth({
	// Configure one or more authentication providers
	adapter: PrismaAdapter(db),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		// ...add more providers here
	],
})
