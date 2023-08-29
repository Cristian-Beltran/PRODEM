import { z } from "zod";

export const FuelingSchema = z.object({
    nInvoce: z.string({
        required_error: "Se requiere una factura de abastecimiento",
    }),
    kmStart: z.number({
        required_error: "Se requiere el kilometraje inicial",
    }),
    kmEnd: z.number({
        required_error: "Se requiere el kilometraje final",
    }),
    price: z.number({
        required_error: "Se requiere el monto total del abastecimiento",
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
})