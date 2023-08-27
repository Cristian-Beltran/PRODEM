import { z } from "zod";


export const PafSchema = z.object({
  lat: z.number({
    required_error: "Se requiere una latitud",
  }),
  log: z.number({
    required_error: "Se requiere una longitud",
  }),
  name: z.string({
    required_error: "Se requiere un nombre",
  }),
  address: z.string({
    required_error: "Se requiere la direccion",
  }),
  type: z.string({
    required_error: "Se require un tipo de paf",
  }),
  manager: z.number({
    required_error: "Se require un gerente",
  }),
});
