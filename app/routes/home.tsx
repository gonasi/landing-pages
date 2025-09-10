import { useIsPending } from "~/utils/misc";
import {
  getValidatedFormData,
  RemixFormProvider,
  useRemixForm,
} from "remix-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema, type LoginFormSchemaTypes } from "~/lib/schemas/auth";
import { Form, redirect, redirectDocument } from "react-router";
import { InputField } from "~/components/ui/forms/InputField";
import { Button } from "~/components/ui/button";
import type { Route } from "./+types/home";
import { createClient } from "~/lib/supabase/supabase.server";
import { dataWithError } from "remix-toast";
import { signInWithEmailAndPassword } from "~/lib/database/auth";
import { getUser } from "~/lib/database/profile";

export function meta() {
  return [
    { title: "Login | SMC" },
    { name: "description", content: "Securely log in to your SMC account" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { supabase } = createClient(request);
  const { user } = await getUser(supabase);

  if (user) {
    return redirect("/ads");
  }

  return null;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const { supabase, headers } = createClient(request);

  // Handle email/password login (existing logic)
  const { errors, data } = await getValidatedFormData(
    formData,
    zodResolver(LoginFormSchema)
  );
  if (errors)
    return dataWithError(null, "Something went wrong. Please try again.");

  const { error } = await signInWithEmailAndPassword(supabase, data);
  if (error)
    return dataWithError(null, error.message || "Incorrect email or password.");

  return redirectDocument(data.redirectTo ?? "/ads", { headers });
}

export default function Home() {
  const isPending = useIsPending();

  const methods = useRemixForm<LoginFormSchemaTypes>({
    mode: "all",
    resolver: zodResolver(LoginFormSchema),
  });

  const isDisabled = isPending;

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-900 text-center">
          Welcome Back
        </h1>
        <p className="mt-2 text-sm text-gray-600 text-center">
          Log in to access your account
        </p>

        <div className="mt-6">
          <RemixFormProvider {...methods}>
            <Form
              method="POST"
              onSubmit={methods.handleSubmit}
              className="space-y-4"
            >
              <InputField
                labelProps={{ children: "Email" }}
                name="email"
                inputProps={{
                  autoFocus: true,
                  className: "lowercase",
                  autoComplete: "email",
                  disabled: isDisabled,
                }}
              />
              <InputField
                labelProps={{ children: "Password" }}
                name="password"
                inputProps={{
                  type: "password",
                  autoComplete: "current-password",
                  disabled: isDisabled,
                }}
              />
              <Button type="submit" disabled={isDisabled} className="w-full">
                {isPending ? "Logging in..." : "Log In"}
              </Button>
            </Form>
          </RemixFormProvider>
        </div>
      </div>
    </section>
  );
}
