import { Outlet } from "react-router";
import { TopNav } from "~/components/top-nav";
import type { Route } from "./+types/private-layout";
import { createClient } from "~/lib/supabase/supabase.server";
import { getUser } from "~/lib/database/profile";
import { redirectWithError } from "remix-toast";

export async function loader({ request }: Route.LoaderArgs) {
  const { supabase } = createClient(request);
  const { user } = await getUser(supabase);

  if (!user) {
    return redirectWithError("/", "You must be logged in!"); // <-- throw, not return
  }

  return user;
}

export default function PrivateLayout({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <TopNav user={{ user: loaderData }} />
      <main className="container mx-auto min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
