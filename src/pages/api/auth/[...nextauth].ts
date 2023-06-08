import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.SM_AUTH_GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.SM_AUTH_GOOGLE_CLIENT_SECRET || ''
    })
  ],
  secret: process.env.SM_AUTH_JWT_SECRET_TOKEN || ''
};

export default NextAuth(authOptions);
