import { z } from "zod";

export const NewCampaignSchema = z.object({
  name: z
    .string({ message: "Campaign name is required" })
    .min(1, { message: "Campaign name cannot be empty" })
    .max(255, { message: "Campaign name too long (max 255 chars)" }),

  objective: z
    .string({ message: "Objective is required" })
    .min(1, { message: "Objective cannot be empty" })
    .max(255, { message: "Objective too long (max 255 chars)" })
    .optional(),
});

export type NewCampaignSchemaTypes = z.infer<typeof NewCampaignSchema>;
