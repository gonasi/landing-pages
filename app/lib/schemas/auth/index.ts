import { z } from "zod";

import { EmailSchema, PasswordSchema } from "../userValidation";

export const LoginFormSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  redirectTo: z.string().optional().nullable(),
});

export type LoginFormSchemaTypes = z.infer<typeof LoginFormSchema>;

export const SignOutFormSchema = z.object({
  intent: z.literal("signout"),
});

export type SignOutFormSchemaTypes = z.infer<typeof SignOutFormSchema>;
