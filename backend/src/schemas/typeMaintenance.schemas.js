import { z } from "zod";

export const typeMaintenanceSchema = z.object({
    name: z.string({
        required_error: "Se requiere un nombre para el tipo de mantenimiento",
    }),
    detail: z.string({
        required_error: "Se requiere el detalle del tipo de mantenimiento",
    })
});