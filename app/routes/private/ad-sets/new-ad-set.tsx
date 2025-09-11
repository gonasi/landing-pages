import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Form, Link } from "react-router";
import {
  getValidatedFormData,
  RemixFormProvider,
  useRemixForm,
} from "remix-hook-form";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { InputField } from "~/components/ui/forms/InputField";
import { TextAreaField } from "~/components/ui/forms/TextAreaField";
import {
  NewAdSetSchema,
  type NewAdSetSchemaTypes,
} from "~/lib/schemas/ad-sets";
import { useIsPending } from "~/utils/misc";
import { createClient } from "~/lib/supabase/supabase.server";
import {
  dataWithError,
  redirectWithError,
  redirectWithSuccess,
} from "remix-toast";
import { insertCampaignAndAdSet, scanFolders } from "~/lib/database/ad-sets";
import { SearchableDropDown } from "~/components/ui/forms/SearchableDropDown";
import type { Route } from "./+types/new-ad-set";

export function meta() {
  return [
    { title: "New Ad | SMC" },
    { name: "description", content: "Securely log in to your SMC account" },
  ];
}

const resolver = zodResolver(NewAdSetSchema);

export async function loader({ request }: Route.LoaderArgs) {
  const { supabase } = createClient(request);
  const { data, success, message } = await scanFolders(supabase);

  if (!success || !data?.length) {
    return redirectWithError("/ad-sets", message);
  }

  return data;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const { supabase } = createClient(request);

  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<NewAdSetSchemaTypes>(formData, resolver);

  // If validation failed, return errors and default values
  if (errors) {
    return { errors, defaultValues };
  }

  const { success, message } = await insertCampaignAndAdSet({
    supabase,
    data,
  });

  return success
    ? redirectWithSuccess(`/ad-sets/${data.ad_set_id}`, message)
    : dataWithError(null, message);
}

export default function NewAd({ loaderData }: Route.ComponentProps) {
  const isPending = useIsPending();

  const methods = useRemixForm<NewAdSetSchemaTypes>({
    mode: "all",
    resolver,
    defaultValues: {
      default_headline: "Discover What’s Possible",
      default_body_text:
        "Join thousands who are already experiencing the benefits. Sign up today and take the first step toward achieving your goals.",
      default_call_to_action: "Learn More",
    },
  });

  const isDisabled = isPending || methods.formState.isSubmitting;

  return (
    <Dialog open>
      <DialogContent
        showCloseButton={false}
        className={"lg:max-w-screen-md overflow-y-scroll max-h-[80%]"}
      >
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Create New Ad Set</DialogTitle>
            <DialogClose>
              <Link to="/ad-sets">
                <X />
              </Link>
            </DialogClose>
          </div>
        </DialogHeader>
        <RemixFormProvider {...methods}>
          <Form method="POST" onSubmit={methods.handleSubmit}>
            {/* Folder Path */}
            <SearchableDropDown
              labelProps={{ children: "Folder" }}
              name="folder_path"
              searchDropdownProps={{
                disabled: isDisabled,
                options: loaderData,
                selectPlaceholder: "Select folder",
              }}
              description="Select the folder where this ad set belongs."
            />

            {/* Meta Campaign ID */}
            <InputField
              name="meta_campaign_id"
              labelProps={{ children: "Meta Campaign ID" }}
              inputProps={{
                disabled: isDisabled,
              }}
              description="The Meta campaign ID this ad set is linked to."
            />

            {/* Ad Set ID */}
            <InputField
              name="ad_set_id"
              labelProps={{ children: "Ad Set ID" }}
              inputProps={{
                disabled: isDisabled,
              }}
              description="Unique identifier for the ad set in Meta."
            />

            {/* Ad Set Name */}
            <InputField
              name="ad_set_name"
              labelProps={{ children: "Ad Set Name" }}
              inputProps={{
                disabled: isDisabled,
              }}
              description="Internal name to help you identify this ad set."
            />

            {/* Default Headline */}
            <InputField
              name="default_headline"
              labelProps={{ children: "Headline" }}
              inputProps={{
                disabled: isDisabled,
              }}
              description="The primary headline shown in the ad."
            />

            {/* Default Body Text */}
            <TextAreaField
              name="default_body_text"
              labelProps={{ children: "Body Text" }}
              textareaProps={{
                disabled: isDisabled,
              }}
              description="The main message or supporting text for the ad."
            />

            {/* Default Call To Action */}
            <InputField
              name="default_call_to_action"
              labelProps={{ children: "Call To Action" }}
              inputProps={{
                disabled: isDisabled,
              }}
              description="Short call-to-action label (e.g., 'Sign Up')."
            />

            <Button
              type="submit"
              disabled={isPending || !methods.formState.isDirty}
            >
              Save Ad Set
            </Button>
          </Form>
        </RemixFormProvider>
      </DialogContent>
    </Dialog>
  );
}
