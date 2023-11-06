import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({ required_error: "El campo email es obligatorio" })
    .email({ message: "Formato de email incorrecto" }),
  password: z.string({ required_error: "El campo password es obligatorio" }),
});

export const signUpSchema = z.object({
  email: z
    .string({ required_error: "El campo email es obligatorio" })
    .email({ message: "Formato de email incorrecto" }),
  password: z
    .string({ required_error: "El campo password es obligatorio" })
    .min(6, "La contraseña debe contener al menos 6 caracteres"),
  name: z.string({ required_error: "El campo nombre es obligatorio" }),
});
