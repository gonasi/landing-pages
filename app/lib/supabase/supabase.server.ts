import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";

import type { Database } from "~/lib/supabase/types";

export function createClient(request: Request) {
  const headers = new Headers();

  const supabase = createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        async getAll() {
          // parseCookieHeader returns { name: string, value?: string }[]
          // Supabase expects { name: string, value: string }[]
          // So filter out cookies with undefined value
          const parsed = parseCookieHeader(request.headers.get("Cookie") ?? "");
          return parsed
            .filter((cookie) => typeof cookie.value === "string")
            .map((cookie) => ({
              name: cookie.name,
              value: cookie.value as string,
            }));
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
