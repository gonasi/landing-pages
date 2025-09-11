import type { NewAdSetSchemaTypes } from "~/lib/schemas/ad-sets";
import type { TypedSupabaseClient } from "../client";
import { getUserId } from "../profile";

/**
 * Input args for creating a campaign + ad set + creatives
 */
type InsertCampaignAndAdSetArgs = {
  data: NewAdSetSchemaTypes;
  supabase: TypedSupabaseClient;
};

/**
 * Normalized file information after scanning Supabase storage.
 */
interface CreativeFile {
  name: string;
  size: number;
  fileUrl: string;
  fileType: "image" | "video" | "unknown";
  mimeType: string;
}

/**
 * Insert a campaign, its ad set, and draft creatives based on files in storage.
 *
 * Flow:
 * 1. Get current user ID
 * 2. Scan folder in Supabase storage for creative files
 * 3. Normalize + filter files (images/videos only)
 * 4. Insert campaign → insert ad set → insert creatives
 * 5. Rollback campaign if ad set fails
 *
 * @param data New ad set and campaign input
 * @param supabase Supabase client
 * @returns Result with success flag, message, and details
 */
export async function insertCampaignAndAdSet({
  data,
  supabase,
}: InsertCampaignAndAdSetArgs) {
  try {
    const userId = await getUserId(supabase);

    /**
     * STEP 1: Scan the storage folder for files
     */
    const { data: folderFiles, error: folderScanError } = await supabase.storage
      .from("ad-creatives")
      .list(data.folder_path, {
        limit: 1000,
        sortBy: { column: "name", order: "asc" },
      });

    if (folderScanError) {
      return {
        success: false,
        message: `Failed to scan folder /${data.folder_path}`,
        data: null,
      };
    }

    // Remove placeholder/hidden files
    const validFiles = folderFiles.filter(
      (file) =>
        file.name && file.name !== ".emptyFolderPlaceholder" &&
        !file.name.startsWith("."),
    );

    if (validFiles.length === 0) {
      return {
        success: false,
        message: `No valid files found in folder /${data.folder_path}`,
        data: null,
      };
    }

    /**
     * STEP 2: Normalize file data (determine type + mime)
     */
    const imageExtensions = ["jpg", "jpeg", "png", "webp", "gif"];
    const videoExtensions = ["mp4", "mov", "avi", "webm", "m4v"];

    const normalizedFiles: CreativeFile[] = validFiles.map((file) => {
      // Guard: skip files with no name
      const fileName = file.name ?? "";
      if (!fileName) {
        return {
          name: "",
          size: file.metadata?.size || 0,
          fileUrl: "",
          fileType: "unknown",
          mimeType: "application/octet-stream",
        };
      }

      const fileExtension = fileName.split(".").pop()?.toLowerCase() || "";

      let fileType: "image" | "video" | "unknown" = "unknown";
      let mimeType = "application/octet-stream";

      if (imageExtensions.includes(fileExtension)) {
        fileType = "image";
        mimeType = `image/${fileExtension === "jpg" ? "jpeg" : fileExtension}`;
      } else if (videoExtensions.includes(fileExtension)) {
        fileType = "video";
        mimeType = `video/${fileExtension}`;
      }

      return {
        name: fileName,
        size: file.metadata?.size || 0,
        fileUrl: `${data.folder_path}/${fileName}`,
        fileType,
        mimeType,
      };
    });

    // Only keep supported files (ignore "unknown")
    const supportedFiles = normalizedFiles.filter((f) =>
      f.fileType !== "unknown"
    );

    /**
     * STEP 3: Create campaign
     */
    const { data: createdCampaign, error: campaignInsertError } = await supabase
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
        data: null,
      };
    }

    const campaignId = createdCampaign.id;

    /**
     * STEP 4: Create ad set
     */
    const { data: createdAdSet, error: adSetInsertError } = await supabase
      .from("ad_sets")
      .insert({
        ad_set_id: data.ad_set_id,
        campaign_id: campaignId,
        ad_set_name: data.ad_set_name,
        created_by: userId,
        updated_by: userId,
      })
      .select("id, ad_set_id, campaign_id")
      .single();

    if (adSetInsertError) {
      // Rollback campaign if ad set creation fails
      await supabase.from("campaigns").delete().eq("id", campaignId);

      return {
        success: false,
        message: "Failed to create ad set. Campaign has been rolled back.",
        data: null,
      };
    }

    /**
     * STEP 5: Create creatives (draft) for each supported file
     */
    const createdCreatives: any[] = [];
    const creativeErrors: any[] = [];

    for (const file of supportedFiles) {
      try {
        const { data: creative, error: creativeInsertError } = await supabase
          .from("ad_creatives")
          .insert({
            campaign_id: campaignId,
            ad_sets_id: createdAdSet.id,
            ad_set_name: data.ad_set_name,
            file_url: file.fileUrl,
            file_type: file.fileType,
            file_size: file.size,
            headline: data.default_headline || null,
            body_text: data.default_body_text || null,
            call_to_action: data.default_call_to_action || null,
            status: "draft",
            created_by: userId,
            updated_by: userId,
          })
          .select()
          .single();

        if (creativeInsertError) {
          console.error(
            "Creative insert failed for:",
            file.name,
            creativeInsertError,
          );
          creativeErrors.push({
            file: file.name,
            error: creativeInsertError.message,
          });
        } else {
          createdCreatives.push({ ...creative, file_name: file.name });
        }
      } catch (err) {
        console.error("Unexpected error inserting creative:", err);
        creativeErrors.push({
          file: file.name,
          error: "Unexpected error occurred",
        });
      }
    }

    /**
     * Final result
     */
    return {
      success: true,
      message: "Ad set created successfully.",
      data: {
        campaignId,
        adSetId: createdAdSet.id,
        totalSupportedFiles: supportedFiles.length,
        createdCreatives: createdCreatives.length,
        failedCreatives: creativeErrors.length,
      },
    };
  } catch (error) {
    console.error("Unexpected top-level error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
      data: null,
    };
  }
}
