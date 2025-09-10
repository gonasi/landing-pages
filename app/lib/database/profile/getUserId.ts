import type { TypedSupabaseClient } from "../client";

export type GetUserIdReturn = Awaited<ReturnType<typeof getUserId>>;

export const getUserId = async (
  supabase: TypedSupabaseClient,
): Promise<string> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  return user.id;
};
