import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(data) {
      const { user, profile } = data;

      console.log("DATA! ", data);

      const response = await fetch(
        process.env.NEXT_PUBLIC_STELLAR_API + "/public/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...user,
            first_name: profile?.given_name,
            last_name: profile?.family_name,
          }),
        }
      );

      console.log("RESPONSE! ", response);

      // if (response.status === 401) {
      //   console.log("User already exists");
      // }

      return true;
    },
  },
});

export { handler as GET, handler as POST };
