import { Controller } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { useRemixFormContext } from "remix-hook-form";

import { Input } from "../input";
import { Label } from "../label";
import { ErrorDisplay, FormDescription } from "./Common";
import type { LabelProps } from "@radix-ui/react-label";

interface InputFieldProps {
  name: string;
  prefix?: string;
  description?: string;
  className?: string;
  labelProps: Omit<LabelProps, "htmlFor" | "error">;
  inputProps?: Omit<
    React.ComponentProps<"input">,
    "error" | "aria-invalid" | "aria-describedby"
  >;
}

export function InputField({
  name,
  prefix,
  description,
  className,
  labelProps,
  inputProps,
}: InputFieldProps) {
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
          <div className="flex w-full items-center">
            <AnimatePresence mode="wait" initial={false}>
              {prefix && (
                <motion.span
                  key={prefix}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="bg-muted font-secondary mr-2 flex h-12 flex-shrink-0 items-center justify-center rounded-md px-2"
                >
                  {prefix}
                </motion.span>
              )}
            </AnimatePresence>
            <Input
              id={id}
              aria-invalid={hasError}
              aria-describedby={description ? descriptionId : undefined}
              {...field}
              {...inputProps}
            />
          </div>
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
