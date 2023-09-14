import { z } from "zod";

export const loginSchema = z.object({
  emailOrUser: z.string({
    required_error: "Se requiere usuario o email",
  }),
  password: z
    .string({
      required_error: "Se requiere la contraseña",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
});

export const passwordSchema = z.object({
  oldPassword: z
    .string({
      required_error: "La contraña actual es requerida",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
  newPassword: z
    .string({
      required_error: "La nueva contraseña es requerida",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
  repeatPassword: z
    .string({
      required_error: "La contraseña repetida es requerida",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
});

export const profileSchema = z.object({
  first_name: z
    .string({
      required_error: "El nombre es requerido",
    })
    .min(4, {
      message: "El nombre debe tener al menos 4 caracteres",
    })
    .max(50, {
      message: "El nombre debe tener como máximo 50 caracteres",
    })
    .regex(/^[a-zA-ZÀÁÉÍÓÚÑ ]+$/, {
      message: "El nombre solo puede contener letras y un espacio",
    }),
  last_name: z
    .string({
      required_error: "El apellido es requeridos",
    })
    .min(4, {
      message: "El apellido debe tener al menos 4 caracteres",
    })
    .max(50, {
      message: "El apellido debe tener como máximo 50 caracteres",
    })
    .regex(/^[a-zA-ZÀÁÉÍÓÚÑ ]+$/, {
      message: "El apellido solo puede contener letras y un espacio",
    }),
  ci: z
    .string({
      required_error: "El ci es requerido",
    })
    .min(4, {
      message: "El ci debe tener al menos 6 caracteres",
    })
    .max(15, {
      message: "El CI debe tener como máximo 15 caracteres",
    }),
  telf: z.string().min(6, { message: "Ingrese un numero de telefono valido" }),
});
