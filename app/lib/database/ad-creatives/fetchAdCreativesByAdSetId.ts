import { AD_CREATIVES_BUCKET } from "../buckets";
import { type FetchDataParams, getPaginationRange } from "../utils";

interface FetchAdCreativesByAdSetIdParams extends FetchDataParams {
  adSetId: string;
}

export async function fetchAdCreativesByAdSetId({
  supabase,
  searchQuery = "",
  limit = 12,
  page = 1,
  adSetId,
}: FetchAdCreativesByAdSetIdParams) {
  const { startIndex, endIndex } = getPaginationRange(page, limit);

  // Select ad_sets plus the joined campaign_id from campaigns
  let query = supabase
    .from("ad_creatives")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .eq("ad_sets_id", adSetId);

  if (searchQuery) {
    query = query.or(
      `headline.ilike.%${searchQuery}%,body_text.ilike.%${searchQuery}%`,
    );
  }

  query = query.range(startIndex, endIndex);

  const { data, count, error } = await query;

  if (error) throw new Error(`Fetch error: ${error.message}`);
  if (!data || data.length === 0) {
    return {
      count: 0,
      data: [],
    };
  }

  const files = await Promise.all(
    data.map(async (file) => {
      const { data: signedUrlData, error: signedUrlError } = await supabase
        .storage
        .from(AD_CREATIVES_BUCKET)
        .createSignedUrl(file.file_url, 3600);

      if (signedUrlError) {
        throw new Error(`Signed URL error: ${signedUrlError.message}`);
      }

      return {
        ...file,
        file_type: file.file_type as "image" | "video" | "unknown",
        signed_url: signedUrlData?.signedUrl ?? null,
      };
    }),
  );

  return {
    count: count || 0,
    data: files,
  };
}
