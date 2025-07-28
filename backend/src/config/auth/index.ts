import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI } from "better-auth/plugins";

import { prisma } from "@/config/db";
import allowedOrigins from "../cors/allowed-origins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  basePath: "/api/v1/auth",
  trustedOrigins: allowedOrigins,
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    password: {
      hash: async (password) => {
        return password;
      },
      async verify(data) {
        const { password, hash } = data;
        return password === hash;
      },
    },
    resetPasswordTokenExpiresIn: 60 * 60 * 24, // 24 hours
    sendResetPassword: async ({ user, url, token }, request) => {
      console.log({ user, url, token });
    },
    onPasswordReset: async ({ user }, request) => {
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`);
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: false, // change to true when using frontend
    sendVerificationEmail: async ({ user, url, token }, req) => {
      console.log("Email verification", { user, url, token });
    },
    async afterEmailVerification(user, req) {
      // Your custom logic here, e.g., grant access to premium features
      console.log(`${user.email} has been successfully verified!`);
    },
  },
  onAPIError: {
    throw: true,
    onError: (error, ctx) => {
      console.log("Auth error", error);
    },
    errorURL: "/api/v1/auth/error",
  },
  plugins: [openAPI({})],
});
