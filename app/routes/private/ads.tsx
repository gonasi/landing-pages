import { Plus } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router";
import type { Route } from "./+types/ads";
import { createClient } from "~/lib/supabase/supabase.server";
import { fetchAllAdCreatives } from "~/lib/database/ads";
import { CreativeCard } from "~/components/cards/CreativeCard";

export function meta() {
  return [
    { title: "Ads | SMC" },
    { name: "description", content: "Securely log in to your SMC account" },
  ];
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const { supabase } = createClient(request);
  const url = new URL(request.url);
  const search = url.searchParams.get("name") ?? "";
  const page = Number(url.searchParams.get("page")) || 1;
  const limit = 12;

  const creatives = await fetchAllAdCreatives({
    supabase,
    searchQuery: search,
    limit,
    page,
  });

  return creatives;
}

export default function AdsPage({ params, loaderData }: Route.ComponentProps) {
  const { count, data } = loaderData;

  return (
    <>
      <section className="container mx-auto p-4 h-screen">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Ads</h2>
          <Link
            to="/ads/new"
            className="flex items-center space-x-2 mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Plus />
            <span className="hidden md:flex">Upload Creative</span>
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data && data.length ? (
            data.map((creative) => (
              <CreativeCard
                key={creative.id}
                creative={{
                  id: creative.id,
                  image_url: creative.signed_url,
                  name: creative.name,
                  created_at: creative.created_at,
                  headline: creative.headline,
                  body_text: creative.body_text,
                  call_to_action: creative.call_to_action,
                }}
                onPreview={(c) => console.log("Preview creative:", c)}
                onEdit={(c) => console.log("Edit creative:", c)}
              />
            ))
          ) : (
            <p className="col-span-full text-muted-foreground text-center">
              No ad creatives found
            </p>
          )}
        </div>
      </section>

      <Outlet />
    </>
  );
}
