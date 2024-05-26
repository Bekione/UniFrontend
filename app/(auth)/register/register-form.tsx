"use client";
import Link from "next/link";
//shad-cn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReloadIcon } from "@radix-ui/react-icons";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStatus } from "react-dom";
import { RegistrationSchema } from "@/schema";

const checkUsernameAvailability = async (
  username: string
): Promise<boolean> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/check-username?username=${username}`);
  const data = await response.json();
  return data.isAvailable;
};

const checkEmailAvailability = async (email: string): Promise<boolean> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/check-email?email=${email}`);
  const data = await response.json();
  return data.isAvailable;
};

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    // mode: "onBlur",
    // reValidateMode: "onChange",
    // shouldFocusError: true,
    // shouldUnregister: true,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const { pending } = useFormStatus();

  const handleRegister = (data: z.infer<typeof RegistrationSchema>) => {
    setLoading(true);
    console.log(form.getValues());

    setLoading(false);
  };

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Signup</CardTitle>
        <CardDescription className="text-center">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="grid gap-4"
            onSubmit={form.handleSubmit(handleRegister)}
          >
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="username"
                rules={{
                    validate: async (value) => {
                        const isAvailable = await checkUsernameAvailability(value);
                        return isAvailable || "That username’s been taken. I guess great minds really do think alike.";
                    },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormControl>
                      <Input {...field} id="username" placeholder="@johndoe" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                rules={{
                  validate: async (value) => {
                    const isAvailable = await checkEmailAvailability(value);
                    return isAvailable || "Email is already in use";
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        id="email"
                        placeholder="johndoe@gmail.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        id="password"
                        placeholder="******"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="confirmPassword"
                        id="confirmPassword"
                        placeholder="******"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={pending}>
              {loading ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Signing
                  up...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>

        <p className="text-muted-foreground text-sm mt-5 px-3 text-center">
          By signing up to uniconnect, you agree to our{" "}
          <Link href="/terms" target="_blank" className="underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="privacy" target="_blank" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
      </CardContent>
    </Card>
  );
}
