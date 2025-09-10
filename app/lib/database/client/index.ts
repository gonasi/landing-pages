import type { Session, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/lib/supabase/types";

export type TypedSupabaseClient = SupabaseClient<Database>;
export type SupabaseSession = Session;
