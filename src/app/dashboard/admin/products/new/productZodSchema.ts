import { z } from "zod";

export const productFormSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(120, "Name must be 120 characters or fewer"),

  slug: z
    .string()
    .min(1, "Slug is required")
    .max(140, "Slug must be 140 characters or fewer")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase letters, numbers, and hyphens only",
    ),

  category: z.enum(["football", "cricket", "badminton", "gym-equipment"], {
    error: "Select a valid category",
  }),

  brand: z
    .string()
    .min(1, "Brand is required")
    .max(80, "Brand must be 80 characters or fewer"),

  price: z
    .number({ error: "Price must be a number" })
    .min(0, "Price cannot be negative"),

  stock: z
    .number({ error: "Stock must be a number" })
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative"),

  description: z
    .string()
    .min(1, "Description is required")
    .max(2000, "Description must be 2000 characters or fewer"),

  image: z.string().min(1, "Image URL is required").url("Must be a valid URL"),

  featured: z.boolean(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
