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
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { InputField } from "~/components/ui/forms/InputField";
import { TextAreaField } from "~/components/ui/forms/TextAreaField";
import {
  NewAdCreativeSchema,
  type NewAdCreativeSchemaTypes,
} from "~/lib/schemas/ads";
import { useIsPending } from "~/utils/misc";
import { createClient } from "~/lib/supabase/supabase.server";
import {
  dataWithError,
  redirectWithError,
  redirectWithSuccess,
} from "remix-toast";
import {
  adCreativeExists,
  createAdCreative,
  fetchAllAdCreatives,
} from "~/lib/database/ads";
import { FileField } from "~/components/ui/forms/FileField";
import type { Route } from "./+types/push-ad";

export function meta() {
  return [
    { title: "New Ad | SMC" },
    { name: "description", content: "Securely log in to your SMC account" },
  ];
}

const resolver = zodResolver(NewAdCreativeSchema);

export async function loader({ request, params }: Route.LoaderArgs) {
  const { supabase } = createClient(request);

  const adExists = await adCreativeExists({
    supabase,
    id: params.adJobId,
  });

  const defaultPageId = process.env.META_DEFAULT_PAGE_ID;
  const defaultCampaignId = process.env.META_DEFAULT_CAMPAIGN_ID;

  if (!adExists) {
    return redirectWithError("/ads", "Add does not exist");
  }

  return {
    defaultPageId,
    defaultCampaignId,
  };
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();

  const { supabase } = createClient(request);

  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<NewAdCreativeSchemaTypes>(formData, resolver);

  // If validation failed, return errors and default values
  if (errors) {
    return { errors, defaultValues };
  }

  const { success, message } = await createAdCreative({
    supabase,
    data,
  });

  return success
    ? redirectWithSuccess(`/ads`, message)
    : dataWithError(null, message);
}

export default function PushAd() {
  const isPending = useIsPending();

  const methods = useRemixForm<NewAdCreativeSchemaTypes>({
    mode: "all",
    resolver,
  });

  const isDisabled = isPending || methods.formState.isSubmitting;

  return (
    <Dialog open>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Push to Meta Ads</DialogTitle>
            <DialogClose>
              <Link to="/ads">
                <X />
              </Link>
            </DialogClose>
          </div>
        </DialogHeader>
        <RemixFormProvider {...methods}>
          <Form
            method="POST"
            encType="multipart/form-data"
            onSubmit={methods.handleSubmit}
          >
            <InputField
              name="name"
              labelProps={{ children: "Page Id" }}
              inputProps={{
                disabled: isDisabled,
              }}
              description="Internal name to help you identify this creative."
            />

            <InputField
              name="call_to_action"
              labelProps={{ children: "Campaign Id" }}
              inputProps={{
                disabled: isDisabled,
              }}
            />

            <Button
              type="submit"
              disabled={isPending || !methods.formState.isDirty}
            >
              Push
            </Button>
          </Form>
        </RemixFormProvider>
      </DialogContent>
    </Dialog>
  );
}
