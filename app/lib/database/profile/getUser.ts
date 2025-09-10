import type { TypedSupabaseClient } from "../client";

export type GetUserReturn = Awaited<ReturnType<typeof getUser>>;

export const getUser = async (
  supabase: TypedSupabaseClient,
) => {
  const { data: { user } } = await supabase.auth.getUser();

  return { user };
};
