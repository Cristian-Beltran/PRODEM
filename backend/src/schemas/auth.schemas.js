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
  telf: z.string().min(6, { message: "Ingrese un numero de telefono valido" }),
  birthdate: z.date({
    invalid_type_error: "No ingresaste una fecha",
  }),
});
