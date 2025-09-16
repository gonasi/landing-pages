import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";

import type { Database } from "~/lib/supabase/types";

export function createClient(request: Request) {
  const headers = new Headers();

  // Fallback defaults if env vars are not set
  const SUPABASE_URL = process.env.SUPABASE_URL ??
    "http://localhost:54321"; // default for local dev
  const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY ??
    "public-anon-key"; // default anon key for dev

  const supabase = createServerClient<Database>(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get("Cookie") ?? "") as {
            name: string;
            value: string;
          }[];
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            headers.append(
              "Set-Cookie",
              serializeCookieHeader(name, value, options),
            )
          );
        },
      },
      cookieEncoding: "base64url",
    },
  );

  return { supabase, headers };
}
