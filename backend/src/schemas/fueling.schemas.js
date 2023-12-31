import { z } from "zod";

export const FuelingSchema = z.object({
    nInvoce: z.string({
        required_error: "Se requiere una factura de abastecimiento",
    }),
    partialFull: z.string({
        required_error: "Se requiere el tipo de llenado",
    }),
    kmStart: z.number({
        required_error: "Se requiere el kilometraje inicial",
    }),
    kmEnd: z.number({
        required_error: "Se requiere el kilometraje final",
    }),
    price: z
        .number({
            required_error: "Se requiere el monto total del abastecimiento",
        })
        .max(9999999, {
            message: "Ingrese un precio válido"
        }),
    liters: z.number({
        required_error: "Se requiere la cantidad de combustible en litros",
    }),
    fuelType: z.string({
        required_error: "Se requiere el tipo de combustible",
    }),
    typeOfRoad: z.string({
        required_error: "Se requiere el tipo de carretera",
    }),
    obvservations: z.string(),
});