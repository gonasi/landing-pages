import type { NewAdSetSchemaTypes } from "~/lib/schemas/ad-sets";
import type { TypedSupabaseClient } from "../client";
import { AD_CREATIVES_BUCKET } from "../buckets";
import { getUserId } from "../profile";

type CreateAdCreativeArgs = {
  data: NewAdSetSchemaTypes;
  supabase: TypedSupabaseClient;
};

export async function createAdSet({
  data,
  supabase,
}: CreateAdCreativeArgs) {
  try {
    const userId = await getUserId(supabase);

    // Validate image file
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(data.image.type)) {
      return {
        success: false,
        message: "Invalid image type. Please use JPG, PNG, or WebP.",
        data: null,
      };
    }

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (data.image.size > maxSize) {
      return {
        success: false,
        message: "Image too large. Please use images under 5MB.",
        data: null,
      };
    }

    // Generate unique filename
    const fileExt = data.image.name.split(".").pop();
    const fileName = `${Date.now()}-${
      Math.random().toString(36).substring(2)
    }.${fileExt}`;
    const filePath = `creatives/${fileName}`;

    // Upload image to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(AD_CREATIVES_BUCKET)
      .upload(filePath, data.image, {
        contentType: data.image.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return {
        success: false,
        message: "Failed to upload image. Please try again.",
        data: null,
      };
    }

    // Save creative metadata to database
    const { data: creative, error: dbError } = await supabase
      .from("ad_creatives")
      .insert({
        name: data.name,
        image_url: uploadData.path,
        headline: data.headline,
        body_text: data.body_text,
        call_to_action: data.call_to_action || "LEARN_MORE",
        created_by: userId,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);

      // Clean up uploaded image if database insert fails
      await supabase.storage.from(AD_CREATIVES_BUCKET).remove([
        uploadData.path,
      ]);

      return {
        success: false,
        message: "Failed to save creative. Please try again.",
        data: null,
      };
    }

    return {
      success: true,
      message: "Creative created successfully.",
      data: creative,
    };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
      data: null,
    };
  }
}
