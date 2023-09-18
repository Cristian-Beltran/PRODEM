import { z } from "zod";

export const ExcelSchema = z.object({
    data: z.array(z.unknown()),
    fileName: z.string(),
});
