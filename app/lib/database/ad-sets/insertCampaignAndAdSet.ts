import type { NewAdSetSchemaTypes } from "~/lib/schemas/ad-sets";
import type { TypedSupabaseClient } from "../client";
import { getUserId } from "../profile";

type CreateAdCreativeArgs = {
  data: NewAdSetSchemaTypes;
  supabase: TypedSupabaseClient;
};

export async function insertCampaignAndAdSet({
  data,
  supabase,
}: CreateAdCreativeArgs) {
  try {
    const userId = await getUserId(supabase);

    // Create campaign
    const { data: newCampaign, error: campaignInsertError } = await supabase
      .from("campaigns")
      .insert({
        campaign_id: data.meta_campaign_id,
        created_by: userId,
        updated_by: userId,
      })
      .select("id")
      .single();

    if (campaignInsertError) {
      return {
        success: false,
        message: "Failed to create campaign.",
        data: campaignInsertError.message,
      };
    }

    const campaignId = newCampaign.id;

    // Create ad set
    const { data: newAdSet, error: adSetInsertError } = await supabase
      .from("ad_sets")
      .insert({
        ad_set_id: data.ad_set_id,
        campaign_id: campaignId,
        ad_set_name: data.ad_set_name,
        folder_path: data.folder_path,
        default_headline: data.default_headline,
        default_body_text: data.default_body_text,
        default_call_to_action: data.default_call_to_action,
        // targeting: data.targeting,
        // budget: data.budget,
        // schedule: data.schedule,
        // status: data.status || 'active',
        created_by: userId,
        updated_by: userId,
      })
      .select("id, ad_set_id, campaign_id")
      .single();

    if (adSetInsertError) {
      // Rollback: delete campaign if ad set creation fails
      await supabase.from("campaigns").delete().eq("id", campaignId);

      return {
        success: false,
        message: "Failed to create ad set. Campaign has been rolled back.",
        data: adSetInsertError.message,
      };
    }

    return {
      success: true,
      message: "Ad set created successfully.",
      data: {
        campaignId,
        adSetId: newAdSet.id,
      },
    };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
      data: error instanceof Error ? error.message : null,
    };
  }
}
