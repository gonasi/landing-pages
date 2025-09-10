import type { TypedSupabaseClient } from "../client";

export const getUser = async (
  supabase: TypedSupabaseClient,
) => {
  const { data: { user } } = await supabase.auth.getUser();

  return { user };
};
