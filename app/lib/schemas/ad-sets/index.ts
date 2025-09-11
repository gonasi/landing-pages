import { z } from "zod";

export const NewAdSetSchema = z.object({
  folder_path: z
    .string({ message: "Folder path is required" })
    .min(3, { message: "Folder path must be at least 3 characters" })
    .max(255, { message: "Folder path too long (max 255 chars)" }),

  meta_campaign_id: z
    .string({ message: "Meta campaign ID is required" })
    .min(5, { message: "Meta campaign ID must be at least 5 characters" })
    .max(255, { message: "Meta campaign ID too long (max 255 chars)" }),

  ad_set_id: z
    .string({ message: "Ad set ID is required" })
    .min(5, { message: "Ad set ID must be at least 5 characters" })
    .max(255, { message: "Ad set ID too long (max 255 chars)" }),

  ad_set_name: z
    .string({ message: "Ad set name is required" })
    .min(3, { message: "Ad set name must be at least 3 characters" })
    .max(255, { message: "Ad set name too long (max 255 chars)" }),

  default_headline: z
    .string({ message: "Headline is required" })
    .min(5, { message: "Headline must be at least 5 characters" })
    .max(255, { message: "Headline too long (max 255 chars)" }),

  default_body_text: z
    .string({ message: "Body text is required" })
    .min(20, { message: "Body text must be at least 20 characters" })
    .max(2000, { message: "Body text too long (max 2000 chars)" }),

  default_call_to_action: z
    .string({ message: "Call-to-action must be a string" })
    .min(2, { message: "Call-to-action must be at least 2 characters" })
    .max(50, { message: "Call-to-action too long (max 50 chars)" }),
});

export type NewAdSetSchemaTypes = z.infer<typeof NewAdSetSchema>;
