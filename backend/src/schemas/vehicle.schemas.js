import { z } from "zod";

export const VehicleSchema = z.object({
  model: z.string({
    required_error: "Se requiere un modelo de auto",
  }),
  plate: z
  .string({
    required_error: "Se require una placa",
  })
  .max(12, {
    message: "Ingrese una placa válida",
  }),
  driver: z.number({
    required_error: "Se require un conductor",
  }),
});
