"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Control, useForm } from "react-hook-form";
import * as z from "zod";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

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
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { useFormState } from "react-hook-form";

// Form schema for confirming password reset
const confirmFormSchema = z
  .object({
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

interface ConfirmFormProps {
  token: string;
}

interface ConfirmFormValues {
  password: string;
  confirmPassword: string;
}

export function ConfirmForm({ token }: ConfirmFormProps) {
  const router = useRouter();

  // Form for confirming password reset
  const confirmForm = useForm<ConfirmFormValues>({
    resolver: zodResolver(confirmFormSchema),
    defaultValues: {
      password: "testing123",
      confirmPassword: "testing123",
    },
  });

  const {
    setError,
    formState: { isLoading },
  } = confirmForm;

  async function onConfirmSubmit(values: z.infer<typeof confirmFormSchema>) {
    try {
      const { data, error } = await authClient.resetPassword({
        newPassword: values.password,
        token,
      });
      if (error) {
        setError("root.apiError", {
          message: error.message || "Failed to reset password",
        });
        console.log("Auth error", error);
      } else {
        // router.push("/admin-dashboard/sign-in");
        console.log("Auth response", data);
        router.push("/admin-dashboard/sign-in");
      }
    } catch (error) {
      setError("root.apiError", {
        message: "Failed to reset password",
      });
      console.error(error);
    } finally {
      // setIsLoading(false);
    }
  }

  return (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Reset Password
        </CardTitle>
        <CardDescription className="text-center">
          Enter your new password below
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* {isLoading && (
          <div className="flex flex-col items-center space-y-4 py-4">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
            <p className="text-center text-muted-foreground">
              Please wait while we reset your password
            </p>
          </div>
        )}

        {!isLoading && error === null && (
          <div className="flex flex-col items-center space-y-4 py-4">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <p className="text-center text-muted-foreground">
              Your password has been reset successfully. You will be redirected
              to the sign-in page shortly.
            </p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center space-y-4 py-4">
            <div className="rounded-full bg-red-100 p-3">
              <XCircle className="h-10 w-10 text-red-600" />
            </div>
            <p className="text-center text-destructive">{error}</p>
          </div>
        )} */}
        <ErrorMessage control={confirmForm.control} />

        <Form {...confirmForm}>
          <form
            onSubmit={confirmForm.handleSubmit(onConfirmSubmit)}
            className="space-y-4"
          >
            <FormField
              control={confirmForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="••••••••"
                      type="password"
                      autoComplete="new-password"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={confirmForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="••••••••"
                      type="password"
                      autoComplete="new-password"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        {/* {!isLoading && error === null && ( */}
        <p className="text-center text-sm text-muted-foreground">
          If not redirected automatically,{" "}
          <Link
            href="/admin-dashboard/sign-in"
            className="text-primary hover:underline"
          >
            click here
          </Link>{" "}
          to sign in.
        </p>
        {/* )} */}
      </CardFooter>
    </>
  );
}

const ErrorMessage = ({ control }: { control: Control<ConfirmFormValues> }) => {
  const {
    errors: { root },
  } = useFormState({ control });
  console.log("root", root);
  return (
    root?.apiError?.message && (
      <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md mb-4">
        {root?.apiError.message}
      </div>
    )
  );
};
