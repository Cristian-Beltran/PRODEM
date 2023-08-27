import { z } from "zod";

export const IncidentSchema = z.object({
  description: z.string({
    required_error: "Se requiere una descripcion",
  }),
  priority: z.string({
    required_error: "Se requiere una prioridad",
  }),
  informedBy: z.string({
    required_error: "Se requiere el personal que informo el incidente",
  }),
  assignedTo: z.string({
    required_error: "Se requiere el personal al que se le asigno el incidente",
  }),
  comments: z.string(),
});
