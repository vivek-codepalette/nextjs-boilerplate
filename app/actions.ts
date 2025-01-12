'use server';

import { SignupValidation } from "@/lib/validations/user";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/user";
import { ZodError } from "zod";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function signup(formData: FormData) {
  try {
    const validatedFields = SignupValidation.parse({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
    });

    await connectToDatabase();

    const existingUser = await User.findOne({ email: validatedFields.email });
    if (existingUser) {
      return { error: 'User with this email already exists' };
    }

    await User.create(validatedFields);
    return { success: 'Account created successfully! Please check your email to sign in.' };
  } catch (err) {
    if (err instanceof ZodError) {
      return { error: err.errors.map(error => error.message).join(', ') };
    }
    if (err instanceof Error) {
      return { error: err.message };
    }
    return { error: 'Something went wrong' };
  }
}

export async function login(formData: FormData) {
  try {
    await signIn('resend', {
      email: formData.get('email') as string,
      redirect: false,
    });
    return { success: 'Check your email for the login link!' };
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case 'EmailSignInError':
          return { error: 'Invalid email address' };
        default:
          return { error: 'Something went wrong' };
      }
    }
    return { error: 'Something went wrong' };
  }
}

export async function signOutAction() {
  return await signOut({ redirectTo: '/login' });
}