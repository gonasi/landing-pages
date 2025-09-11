import type { TypedSupabaseClient } from "../client";

export async function fetchAdSetById({
  supabase,
  adSetId,
}: {
  supabase: TypedSupabaseClient;
  adSetId: string;
}) {
  const { data, error } = await supabase
    .from("ad_sets")
    .select(
      `
      *,
      campaigns (
        campaign_id
      )
      `,
    )
    .eq("id", adSetId)
    .single(); // Expect only one record

  if (error || !data) {
    return {
      success: false,
      message: "Failed to fetch ad set.",
      data: null,
    };
  }

  return {
    success: true,
    message: "Ad set fetched successfully.",
    data: {
      ...data,
      campaign_id: data.campaigns?.campaign_id ?? null,
    },
  };
}
