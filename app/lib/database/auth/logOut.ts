import type { TypedSupabaseClient } from "../client";

export const logOut = async (supabase: TypedSupabaseClient) => {
  const { error } = await supabase.auth.signOut();
  return { error };
};
