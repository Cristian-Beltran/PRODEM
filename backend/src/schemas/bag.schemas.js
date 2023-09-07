import { z } from "zod";

export const BagSchema = z.object({
    serial: z.string({
        required_error: "Se requiere el serial de la bolsa",
    }),
    amount: z.number({
        required_error: "Se requiere la cantidad de la bolsa",
        invalid_type_error: "La cantidad de la bolsa debe ser un numero",
    }),
    type: z.string({
        required_error: "Se requiere el tipo de la bolsa",
    }),
    voBoParcial: z.string(),
    others: z.string(),
});