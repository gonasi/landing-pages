import FullPageLayout from "~/routes/layouts/full-page-layout";
import type { Route } from "./+types/view-ad-set";
import { createClient } from "~/lib/supabase/supabase.server";
import { fetchAdSetById } from "~/lib/database/ad-sets";
import { redirectWithError } from "remix-toast";

export function meta() {
  return [
    { title: "Ad Set Details | SMC" },
    {
      name: "description",
      content: "View detailed information about your ad set in SMC.",
    },
  ];
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const { supabase } = createClient(request);

  const result = await fetchAdSetById({
    supabase,
    adSetId: params.adSetId,
  });

  if (!result.success || !result.data) {
    return redirectWithError("/ad-sets", result.message);
  }

  return result.data;
}

export default function ViewAdSet({
  params,
  loaderData,
}: Route.ComponentProps) {
  return (
    <FullPageLayout title={loaderData.ad_set_name} prevLink="/ad-sets">
      <h2 className="text-xl font-semibold">Ad Set Information</h2>
      <p className="mt-2 text-muted-foreground">
        Here you can review all the details of your selected ad set.
      </p>
    </FullPageLayout>
  );
}
