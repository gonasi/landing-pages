import z from "zod";

const MAX_SIZE = 1024 * 1024 * 3; // 5MB
const VALID_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/gif"];

export const EmailSchema = z
  .string({
    message: "Email is required",
  })
  .trim()
  .min(1, { message: "Email address is required to continue" })
  .min(3, { message: "Email looks too short" })
  .max(100, { message: "Email is too long (max 100 characters)" })
  .pipe(z.email({ message: "That doesn't look like a valid email" }))
  .transform((value) => value.toLowerCase());

export const PasswordSchema = z
  .string({
    message: "Password is required",
  })
  .min(1, { message: "Password is required to continue" })
  .min(6, {
    message: "Password must be at least 6 characters",
  })
  .refine((val) => new TextEncoder().encode(val).length <= 40, {
    message: "Password must be under 40 characters",
  });

export const NewImageSchema = z.any().superRefine((file, ctx) => {
  if (!(file instanceof File)) {
    ctx.addIssue({
      code: "custom",
      message: "Please upload a valid image file",
    });
    return;
  }

  if (file.size === 0) {
    ctx.addIssue({
      code: "custom",
      message: "No image was selected",
    });
  }

  if (file.size > MAX_SIZE) {
    ctx.addIssue({
      code: "custom",
      message: "Image is too large — max 5MB allowed",
    });
  }

  if (!VALID_IMAGE_TYPES.includes(file.type)) {
    ctx.addIssue({
      code: "custom",
      message: "Only PNG, JPG, JPEG, or GIF images are allowed",
    });
  }
});
