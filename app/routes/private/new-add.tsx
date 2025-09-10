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
import type { Route } from "./+types/new-add";
import { createClient } from "~/lib/supabase/supabase.server";
import { dataWithError, redirectWithSuccess } from "remix-toast";
import { createAdCreative } from "~/lib/database/ads";
import { FileField } from "~/components/ui/forms/FileField";

export function meta() {
  return [
    { title: "New Ad | SMC" },
    { name: "description", content: "Securely log in to your SMC account" },
  ];
}

const resolver = zodResolver(NewAdCreativeSchema);

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

export default function NewAd() {
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
            <DialogTitle>Create New Ad Creative</DialogTitle>
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
            <FileField
              name="image"
              labelProps={{ children: "Creative Image" }}
              inputProps={{
                disabled: isDisabled,
                type: "file",
              }}
              description="Upload a creative image (JPG, PNG, or WEBP)."
            />

            <InputField
              name="name"
              labelProps={{ children: "Creative Name" }}
              inputProps={{
                disabled: isDisabled,
              }}
              description="Internal name to help you identify this creative."
            />

            <InputField
              name="headline"
              labelProps={{ children: "Headline" }}
              inputProps={{
                disabled: isDisabled,
              }}
              description="The primary headline shown in the ad."
            />

            <TextAreaField
              name="body_text"
              labelProps={{ children: "Body Text" }}
              textareaProps={{
                disabled: isDisabled,
              }}
              description="The main message or supporting text for the ad."
            />

            <InputField
              name="call_to_action"
              labelProps={{ children: "Call To Action" }}
              inputProps={{
                disabled: isDisabled,
              }}
            />

            <Button
              type="submit"
              disabled={isPending || !methods.formState.isDirty}
            >
              Save Creative
            </Button>
          </Form>
        </RemixFormProvider>
      </DialogContent>
    </Dialog>
  );
}
