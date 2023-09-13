import { z } from "zod";

export const DriverSchema = z.object({
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
  address: z.string(),
  telf: z.number(),
  license: z.string({
    required_error: "La licencia es requerida",
  })
  .max(12, {
    message: "La licencia debe tener como máximo 12 caracteres",
  }),
  username: z.string({
    required_error: "Se requiere un nombre de usuario",
  }),
  birthdate: z.string({
    required_error: "Se requiere una fecha de nacimiento",
  }),
});
