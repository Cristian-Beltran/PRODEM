import { z } from "zod";

export const maintenanceSchema = z.object({
    nInvoce: z.string({
        required_error: "Se requiere una factura de mantenimiento",
    }),
    detail: z.string({
        required_error: "Se requiere el detalle del mantenimiento",
    }),
    amount: z.number({
        required_error: "Se requiere el costo del mantenimiento",
    }),
    typeMantenance: z.number({
        required_error: "Se require un tipo de mantenimiento",
    }),
    guard: z.number({
        required_error: "Se require un guardia",
    }),
    driver: z.number({
        required_error: "Se require un conductor",
    }),
    vehicle: z.number({
        required_error: "Se require un vehículo",
    }),
})