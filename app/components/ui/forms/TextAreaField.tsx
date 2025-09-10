import { Controller } from "react-hook-form";
import { useRemixFormContext } from "remix-hook-form";

import { Label } from "../label";
import { ErrorDisplay, FormDescription } from "./Common";
import type { LabelProps } from "@radix-ui/react-label";
import { Textarea } from "../textarea";

interface TextAreaFieldProps {
  name: string;
  description?: string;
  className?: string;
  labelProps: Omit<LabelProps, "htmlFor" | "error">;
  textareaProps: Omit<
    React.ComponentProps<"textarea">,
    "error" | "aria-invalid" | "aria-describedby"
  >;
}

export function TextAreaField({
  name,
  description,
  className,
  labelProps,
  textareaProps,
}: TextAreaFieldProps) {
  const {
    control,
    formState: { errors },
  } = useRemixFormContext();

  const id = name;
  const descriptionId = `${id}-description`;
  const error = errors[name];
  const hasError = !!error;
  const errorMessage = error?.message?.toString() || "This field has an error";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={className}>
          <Label htmlFor={id} {...labelProps} />
          <Textarea
            id={id}
            aria-invalid={hasError}
            aria-describedby={description ? descriptionId : undefined}
            {...field}
            {...textareaProps}
          />
          <div className="min-h-[32px] pt-1 pb-3">
            {hasError && errorMessage && <ErrorDisplay error={errorMessage} />}
            {description && (
              <FormDescription id={descriptionId}>
                {description}
              </FormDescription>
            )}
          </div>
        </div>
      )}
    />
  );
}
