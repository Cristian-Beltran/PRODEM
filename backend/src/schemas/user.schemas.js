import { z } from "zod";

export const UserSchema = z.object({
  email: z
    .string({
      required_error: "El email es requerido",
    })
    .email({
      message: "Email invalido",
    }),
  first_name: z
    .string({
      required_error: "El nombre es requerido",
    })
    .min(4, {
      message: "El nombre debe tener al menos 4 caracteres",
    })
    .max(15, {
      message: "El nombre debe tener como máximo 15 caracteres",
    })
    .regex(/^[a-zA-ZÀÁÉÍÓÚÑ]+$/, {
      message: "El nombre solo puede contener letras",
    }),
  last_name: z
    .string({
      required_error: "El apellido es requeridos",
    })
    .min(4, {
      message: "El apellido debe tener al menos 4 caracteres",
    })
    .max(15, {
      message: "El apellido debe tener como máximo 15 caracteres",
    })
    .regex(/^[a-zA-ZÀÁÉÍÓÚÑ]+$/, {
      message: "El apellido solo puede contener letras",
    }),
  ci: z
    .string({
      required_error: "El CI es requerido",
    })
    .min(4, {
      message: "El CI debe tener al menos 6 caracteres",
    })
    .max(15, {
      message: "El CI debe tener como máximo 15 caracteres",
    }),
  address: z
    .string({
      required_error: "La direccion es requerida",
    }),
  telf: z
    .number({
      required_error: "El telefono es requerido",
    })
    .int()
    .positive()
    .max(999999999999, {
      message: "El telefono debe tener como máximo 12 dígitos",
    }),
  type: z
    .string({
      required_error: "Se requiere un tipo de usuario",
    }),
  username: z.string({
    required_error: "Se requiere un nombre de usuario",
  })
    .min(4, {
      message: "El CI debe tener al menos 6 caracteres",
    })
    .max(15, {
      message: "El CI debe tener como máximo 15 caracteres",
    }),
  birthdate: z
    .string({
      required_error: "Se requiere una fecha de nacimiento",
    }),
});