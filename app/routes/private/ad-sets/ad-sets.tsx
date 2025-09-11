import { Plus } from "lucide-react";
import { Link, Outlet } from "react-router";
import { createClient } from "~/lib/supabase/supabase.server";
import { CreativeCard } from "~/components/cards/CreativeCard";
import type { Route } from "./+types/ad-sets";
import { fetchAllAdCreatives } from "~/lib/database/ads";
import { scanFolders } from "~/lib/database/ad-sets";

export function meta() {
  return [
    { title: "Ad Sets | SMC" },
    { name: "description", content: "View and manage your ad sets" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { supabase } = createClient(request);

  const folders = await scanFolders(supabase);

  console.log("folders: ", folders);

  return folders;
}

export default function AdSetsPage({
  params,
  loaderData,
}: Route.ComponentProps) {
  const { count, data } = loaderData;

  return (
    <>
      <section className="container mx-auto p-4 h-screen">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Ad Sets</h2>
          <Link
            to="/ad-sets/new"
            className="flex items-center space-x-2 mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Plus />
            <span className="hidden md:flex">Create Ad Set</span>
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data && data.length ? (
            data.map((adSet) => (
              <CreativeCard
                key={adSet.id}
                creative={{
                  id: adSet.id,
                  image_url: adSet.signed_url, // adjust if ad sets don’t have images
                  name: adSet.name,
                  created_at: adSet.created_at,
                  headline: adSet.headline,
                  body_text: adSet.body_text,
                  call_to_action: adSet.call_to_action,
                }}
                onPreview={(c) => console.log("Preview ad set:", c)}
                onEdit={(c) => console.log("Edit ad set:", c)}
              />
            ))
          ) : (
            <p className="col-span-full text-muted-foreground text-center">
              No ad sets found
            </p>
          )}
        </div>
      </section>

      <Outlet />
    </>
  );
}
