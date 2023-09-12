import { z } from "zod";

export const RemesaAdminSchema = z.object({
  order: z.string({
    required_error: "Se requiere el orden",
  }),
  typeOfService: z.string({
    required_error: "Se requiere el tipo de servicio",
  }),
  subType: z.string({
    required_error: "Se requiere un subtipo de envio",
  }),
});

export const RemesaManagerSchema = z.object({
  content: z.string({
    required_error: "Se requiere el contenido",
  }),
  observations: z.string({
    required_error: "Se requiere la observacion",
  }),
});
