import { AD_CREATIVES_BUCKET } from "../buckets";
import type { TypedSupabaseClient } from "../client";
import { getPaginationRange } from "../utils";

export interface FetchAdCreativesParams {
  supabase: TypedSupabaseClient;
  searchQuery?: string;
  limit?: number;
  page?: number;
}

export async function fetchAllAdCreatives({
  supabase,
  searchQuery = "",
  limit = 12,
  page = 1,
}: FetchAdCreativesParams) {
  const { startIndex, endIndex } = getPaginationRange(page, limit);

  // Base query to fetch ad creatives
  let query = supabase
    .from("ad_creatives")
    .select(
      "id, name, image_url, headline, body_text, call_to_action, created_by, created_at, updated_at",
      { count: "exact" },
    )
    .order("created_at", { ascending: false })
    .range(startIndex, endIndex);

  // Optional search filter
  if (searchQuery) {
    query = query.or(
      `name.ilike.%${searchQuery}%,headline.ilike.%${searchQuery}%`,
    );
  }

  const { data: creatives, error, count } = await query;

  if (error) {
    console.error("Failed to fetch ad creatives:", error.message);
    return { count: 0, data: [] };
  }

  if (!creatives?.length) {
    return { count: 0, data: [] };
  }

  // Attach signed URLs (valid for 1 year)
  const dataWithSignedUrls = await Promise.all(
    creatives.map(async (creative) => {
      if (!creative.image_url) return { ...creative, signed_url: null };

      const { data: signedUrlData, error: signedUrlError } = await supabase
        .storage
        .from(AD_CREATIVES_BUCKET)
        .createSignedUrl(creative.image_url, 60 * 60 * 24 * 365); // 1 year

      if (signedUrlError) {
        console.error(
          `Failed to create signed URL for ${creative.image_url}:`,
          signedUrlError.message,
        );
      }

      return {
        ...creative,
        signed_url: signedUrlData?.signedUrl || null,
      };
    }),
  );

  return { count, data: dataWithSignedUrls };
}
