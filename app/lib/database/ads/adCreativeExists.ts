import type { TypedSupabaseClient } from "../client";

export async function adCreativeExists({
  supabase,
  id,
}: {
  supabase: TypedSupabaseClient;
  id: string;
}): Promise<boolean> {
  const { data, error } = await supabase
    .from("ad_creatives")
    .select("id")
    .eq("id", id);

  if (error) {
    return false;
  }

  return (data?.length ?? 0) > 0;
}
