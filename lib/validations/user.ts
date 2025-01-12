import { z } from "zod";

export const SignupValidation = z.object({
  firstName: z.string()
    .trim()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(30, { message: "First name must be less than 30 characters" })
    .regex(/^[a-zA-Z\s]*$/, { message: "First name can only contain letters and spaces" }),
  lastName: z.string()
    .trim()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(30, { message: "Last name must be less than 30 characters" })
    .regex(/^[a-zA-Z\s]*$/, { message: "Last name can only contain letters and spaces" }),
  email: z.string()
    .trim()
    .toLowerCase()
    .email({ message: "Please enter a valid email address" })
    .min(5, { message: "Email must be at least 5 characters" })
    .max(50, { message: "Email must be less than 50 characters" })
});

export type SignupValidationType = z.infer<typeof SignupValidation>; 