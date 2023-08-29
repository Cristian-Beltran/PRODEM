import { z } from "zod";

export const VehicleSchema = z.object({
  model: z.string({
    required_error: "Se requiere un modelo de auto",
  }),
  plate: z.string({
    required_error: "Se require una placa",
  }),
  driver: z.number({
    required_error: "Se require un conductor",
  }),
});
