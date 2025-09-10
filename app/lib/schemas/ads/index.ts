import { z } from "zod";

/**
 * Ad Creative Insert Schema
 * Matches new DB schema + validates uploaded file
 */
export const NewAdCreativeSchema = z.object({
  name: z
    .string({ message: "Creative name is required" })
    .min(1, { message: "Creative name cannot be empty" })
    .max(255, { message: "Creative name too long (max 255 chars)" }),

  image: z
    .file({ message: "Image is required" })
    .min(1, { message: "Image cannot be empty" })
    .max(10 * 1024 * 1024, { message: "Image must be under 10MB" })
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
          file.type,
        ),
      { message: "Invalid file type. Allowed: JPEG, PNG, GIF, WebP" },
    ),

  headline: z
    .string({ message: "Headline is required" })
    .min(1, { message: "Headline cannot be empty" })
    .max(255, { message: "Headline too long (max 255 chars)" }),

  body_text: z
    .string({ message: "Body text is required" })
    .min(1, { message: "Body text cannot be empty" })
    .max(2000, { message: "Body text too long (max 2000 chars)" }),

  call_to_action: z
    .string()
    .max(50, { message: "Call-to-action too long (max 50 chars)" })
    .optional(),
});

export type NewAdCreativeSchemaTypes = z.infer<typeof NewAdCreativeSchema>;

export const PushToMetaSchema = z.object({
  creative_id: z
    .uuidv4({ message: "Creative name is required" }),

  page_id: z
    .string({ message: "Headline is required" })
    .min(3, { message: "Headline cannot be empty" })
    .max(255, { message: "Headline too long (max 255 chars)" }),

  page_id: z
    .string({ message: "Headline is required" })
    .min(3, { message: "Headline cannot be empty" })
    .max(255, { message: "Headline too long (max 255 chars)" }),

  campaign_id: z
    .string({ message: "Headline is required" })
    .min(3, { message: "Headline cannot be empty" })
    .max(255, { message: "Headline too long (max 255 chars)" }),

  body_text: z
    .string({ message: "Body text is required" })
    .min(1, { message: "Body text cannot be empty" })
    .max(2000, { message: "Body text too long (max 2000 chars)" }),

  call_to_action: z
    .string()
    .max(50, { message: "Call-to-action too long (max 50 chars)" })
    .optional(),
});

export type PushToMetaSchemaTypes = z.infer<typeof NewAdCreativeSchema>;
