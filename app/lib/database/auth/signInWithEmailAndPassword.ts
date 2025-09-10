import type { LoginFormSchemaTypes } from "~/lib/schemas/auth";
import type { TypedSupabaseClient } from "~/lib/database/client";

export const signInWithEmailAndPassword = async (
  supabase: TypedSupabaseClient,
  payload: LoginFormSchemaTypes,
) => {
  const { email, password } = payload;
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(`[signInWithEmailAndPassword]: `, {
      error: error.message,
      email,
    });
  }

  return { error, data };
};
