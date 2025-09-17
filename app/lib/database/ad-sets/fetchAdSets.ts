import { type FetchDataParams, getPaginationRange } from "../utils";

export async function fetchAdSets({
  supabase,
  searchQuery = "",
  limit = 12,
  page = 1,
}: FetchDataParams) {
  const { startIndex, endIndex } = getPaginationRange(page, limit);

  // Select ad_sets plus the joined campaign_id from campaigns
  let query = supabase
    .from("ad_sets")
    .select(
      `
      *,
      campaigns (
        campaign_id
      )
      `,
      { count: "exact" },
    )
    .order("created_at", { ascending: false });

  if (searchQuery) {
    query = query.or(
      `ad_set_name.ilike.%${searchQuery}%`,
    );
  }

  query = query.range(startIndex, endIndex);

  const { data, count, error } = await query;

  // if (error) throw new Error(`Fetch error: ${error.message}`);
  if (error || !data || data.length === 0) {
    return {
      count: 0,
      data: [],
    };
  }

  // Flatten campaigns.campaign_id into each row
  const formattedData = data.map((row) => ({
    ...row,
    campaign_id: row.campaigns?.campaign_id ?? null,
  }));

  return {
    count: count || 0,
    data: formattedData,
  };
}
