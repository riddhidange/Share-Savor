import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" })
    .endsWith(".edu", { message: "Use your student email" })
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters." })
    .max(20)
    .trim(),
});

export const registerSchema = z
  .object({
    firstName: z.string().min(2, { message: "First name is required" }).trim(),
    lastName: z.string().min(2, { message: "Last name is required" }).trim(),
    email: z
      .string()
      .email({ message: "Invalid email" })
      .endsWith(".edu", { message: "Use your student email" })
      .trim(),
    gender: z.string().min(4, { message: "Gender is required" }).trim(),
    dateOfBirth: z.date({
      message: "Date of birth is required",
      invalid_type_error: "Date of birth is required",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters." })
      .max(20)
      .trim(),
    university: z.string({ message: "University is required" }).min(2).trim(),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters." })
      .max(20)
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });
