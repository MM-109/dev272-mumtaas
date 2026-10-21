import { z } from "zod";

export const dhikrSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Dhikr name is required.")
    .min(2, "Name must be at least 2 characters."),
  meaning: z
    .string()
    .trim()
    .min(1, "Meaning is required."),
  hadith: z
    .string()
    .trim()
    .min(1, "Hadith or reference is required."),
  target: z.coerce
    .number({ error: "Target must be a number." })
    .int("Target must be a whole number.")
    .min(1, "Target must be at least 1.")
    .max(1000, "Target cannot exceed 1000."),
  isFavorite: z.boolean(),
});

export type DhikrFormValues = z.input<typeof dhikrSchema>;
export type DhikrData = z.output<typeof dhikrSchema>;
