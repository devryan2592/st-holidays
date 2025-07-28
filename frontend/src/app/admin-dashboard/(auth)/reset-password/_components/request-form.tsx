"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Form schema for requesting password reset
const requestFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

enum ResetStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export function RequestForm() {
  const [status, setStatus] = useState<ResetStatus>(ResetStatus.IDLE);
  const [error, setError] = useState<string | null>(null);

  // Form for requesting password reset
  const requestForm = useForm<z.infer<typeof requestFormSchema>>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle request password reset form submission
  async function onRequestSubmit(values: z.infer<typeof requestFormSchema>) {
    setStatus(ResetStatus.LOADING);
    setError(null);

    try {
      // Using the requestPasswordReset method from better-auth
      const response = await authClient.requestPasswordReset({
        email: values.email,
      });

      if (response.error) {
        setStatus(ResetStatus.ERROR);
        setError(response.error.message || "Failed to send reset email");
      } else {
        setStatus(ResetStatus.SUCCESS);
        requestForm.reset();
      }
    } catch (error) {
      setStatus(ResetStatus.ERROR);
      setError("An unexpected error occurred. Please try again.");
      console.error(error);
    }
  }

  return (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
        <CardDescription>
          Enter your email address and we will send you a link to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        {status === ResetStatus.ERROR && (
          <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        {status === ResetStatus.SUCCESS && (
          <div className="bg-green-100 text-green-800 text-sm p-3 rounded-md mb-4">
            Password reset link has been sent to your email address. Please check your inbox.
          </div>
        )}
        <Form {...requestForm}>
          <form onSubmit={requestForm.handleSubmit(onRequestSubmit)} className="space-y-4">
            <FormField
              control={requestForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@example.com"
                      type="email"
                      autoComplete="email"
                      disabled={status === ResetStatus.LOADING}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={status === ResetStatus.LOADING}
            >
              {status === ResetStatus.LOADING ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-center w-full text-muted-foreground">
          Remember your password?{" "}
          <Link
            href="/admin-dashboard/sign-in"
            className="text-primary underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </CardFooter>
    </>
  );
}