import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({ required_error: "El campo email es obligatorio" })
    .email({ message: "Formato de email incorrecto" }),
});

export const signUpSchema = z.object({
  email: z
    .string({ required_error: "El campo email es obligatorio" })
    .email({ message: "Formato de email incorrecto" }),
});
