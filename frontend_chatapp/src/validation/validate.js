import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(16, "Password must not be greater than 16 characters"),
  pic: z.string({ message: "Please Upload Picture" }),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(16, "Password must not be greater than 16 characters"),
});
