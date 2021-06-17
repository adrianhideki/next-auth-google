import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profileUrl: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
    }),
  ],
  jwt: {
    signingKey: process.env.JWTSIGNIN_KEY,
  },
  // session: {
  //   maxAge: 30 * 24 * 60 * 60, // 30 days
  // },
  callbacks: {
    async signIn(user, account, profile) {
      console.log(user, account, profile);
      return true;
    },
    async redirect(url, baseUrl) {
      // console.log(url, baseUrl);
      return baseUrl;
    },
    async session(session, user) {
      // console.log(session, user);
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      // console.log(token, user, account, profile, isNewUser);
      return token;
    },
    // TODO: adicionar callback para adicionar usuário
    // https://next-auth.js.org/configuration/options#callbacks
  },
});
