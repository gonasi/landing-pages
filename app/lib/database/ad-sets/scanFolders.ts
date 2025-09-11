import type { TypedSupabaseClient } from "~/lib/database/client";
import { AD_CREATIVES_BUCKET } from "../buckets";

export const scanFolders = async (
  supabase: TypedSupabaseClient,
) => {
  const { data: files, error } = await supabase.storage
    .from(AD_CREATIVES_BUCKET)
    .list("", {
      limit: 1000,
      sortBy: { column: "name", order: "asc" },
    });

  if (error) {
    console.error(`[scanFolders]: `, {
      error: error.message,
    });

    return {
      success: false,
      message: "Could not load folders",
      data: null,
    };
  }

  if (files.length === 0) {
    return {
      success: false,
      message: "No folders found",
      data: null,
    };
  }

  const filesForDropdown = files.map((file) => {
    return {
      value: file.name,
      label: file.name,
    };
  });

  return {
    success: true,
    message: "Folders found",
    data: filesForDropdown,
  };
};
