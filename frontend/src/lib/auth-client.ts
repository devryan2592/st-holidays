import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:8000",
  basePath: "/api/v1/auth",
  plugins: [],
});

export const { signIn, signUp, signOut, useSession } = authClient;
