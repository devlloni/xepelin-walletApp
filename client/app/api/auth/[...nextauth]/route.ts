import axios from 'axios';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
    providers: [GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === 'google') {
                try {
                    const res = await axios.post('http://localhost:4000/accounts', {
                        email: user.email,
                        name: user.name,
                        balance: 0,
                        // image: user.image,
                        // googleId: user.id,
                    });
                    if (res.status === 200) {
                        return true;
                    } else {
                        return false;
                    }
                } catch (error) {
                    console.error('Error al crear la cuenta en el backend: ', error);
                    return false;
                }
            }
            return false;
        }
    }
});

export { handler as GET, handler as POST };