import { z } from "zod";

export const reportSchema = z.object({
  reportDate: z
    .date()
    .refine(
      (d) => d.getTime() < Date.now() - 7 * 24 * 60 * 60 * 1000,
      "Report date must be at least 7 days before today."
    ),
  images: z
    .instanceof(File, { message: "Please upload a file." })
    .refine((f) => f.size < 100_000, "Max 100Kb upload size.")
    .array(),
});

export type ReportSchema = typeof reportSchema;

export const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  reports: z
    .array(reportSchema)
    .min(1, "At least one report must be submitted"),
});
