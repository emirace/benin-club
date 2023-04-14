import { User } from '@/models/user.model';
import clientPromise from '@/utils/mongoose';
import { connectDB } from '@/utils/mongoose';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { comparePassword } from '@/utils/auth';

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(
        credentials: Record<'email' | 'password', string> | undefined
      ) {
        if (!credentials) {
          throw new Error('No credentials provided');
        }

        await connectDB();
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('Invalid email & password');
        }
        const isPasswordCorrect = await comparePassword(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error('Invalid email & password');
        }
        return user;
      },
    }),
  ],
  debug: process.env.NEXT_ENV === 'development',
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: 'jwt' },
  jwt: { secret: process.env.NEXTAUTH_SECRET },
  secret: process.env.NEXTAUTH_SECRET,
});
