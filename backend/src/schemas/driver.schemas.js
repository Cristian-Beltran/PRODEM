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
    }),
  last_name: z
    .string({
      required_error: "El apellido es requeridos",
    })
    .min(4, {
      message: "El apellido debe tener al menos 4 caracteres",
    }),
  ci: z
    .string({
      required_error: "El ci es requerido",
    })
    .min(4, {
      message: "El ci debe tener al menos 6 caracteres",
    }),
  address: z.string(),
  telf: z.number(),
  license: z.string({
    required_error: "La licensia es requerida",
  }),
  username: z.string({
    required_error: "Se requiere un nombre de usuario",
  }),
  birthdate: z.string({
    required_error: "Se requiere una fecha de nacimiento",
  }),
});
