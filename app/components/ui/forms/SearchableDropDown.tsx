import { useState } from "react";
import { Controller } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRemixFormContext } from "remix-hook-form";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command";
import { Label } from "../label";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { ErrorDisplay, FormDescription } from "./Common";
import type { LabelProps } from "@radix-ui/react-label";

import { cn } from "~/lib/utils";

export interface SearchableDropdownItem {
  description?: string;
  imageUrl?: string;
  value: string;
  label: string;
}

export interface SearchableDropdownProps {
  options: SearchableDropdownItem[];
  disabled?: boolean;
  searchPlaceholder?: string;
  selectPlaceholder?: string;
  notFoundPlaceholder?: string;
  className?: string;
  imageContainerClassName?: string;
  imageClassName?: string;
}

interface SearchableDropDownProps {
  name: string;
  description?: string;
  className?: string;
  labelProps: Omit<LabelProps, "htmlFor" | "error">;
  disabled?: boolean;
  searchDropdownProps: SearchableDropdownProps;
}

export function SearchableDropDown({
  name,
  description,
  className,
  labelProps,
  disabled,
  searchDropdownProps,
}: SearchableDropDownProps) {
  const {
    control,
    formState: { errors },
  } = useRemixFormContext();

  const id = name;
  const descriptionId = `${id}-description`;
  const error = errors[name];
  const hasError = !!error;
  const errorMessage = error?.message?.toString() || "This field has an error";

  const {
    options,
    searchPlaceholder = "Search for an option...",
    selectPlaceholder = "Select an option...",
    notFoundPlaceholder = "No options available",
    imageContainerClassName = "border-border h-6 w-6 rounded-full border",
    imageClassName = "h-full w-full rounded-full object-cover",
  } = searchDropdownProps;

  const [open, setOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selectedOption = options.find(
          (option) => option.value === field.value
        );

        return (
          <div className={className}>
            <Label htmlFor={id} {...labelProps} />
            <Popover
              open={open}
              onOpenChange={(isOpen) => {
                if (!disabled) {
                  setOpen(isOpen);
                }
              }}
              modal={false}
            >
              <PopoverTrigger asChild>
                <button
                  type="button"
                  role="combobox"
                  aria-controls={open ? "command-list" : undefined} // only set if ID exists
                  aria-expanded={!!open} // ensures true/false only
                  disabled={disabled}
                  aria-label={name}
                  title={name}
                  className={cn(
                    `flex ${selectedOption?.description ? "h-20" : "h-9"} w-full min-w-0 items-center justify-between rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm`,
                    "text-foreground font-secondary",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    hasError
                      ? "border-destructive text-destructive"
                      : "border-input",
                    disabled
                      ? "pointer-events-none cursor-not-allowed opacity-50"
                      : "cursor-pointer",
                    !field.value && "text-muted-foreground"
                  )}
                  onClick={(e) => {
                    if (disabled) {
                      e.preventDefault();
                      return;
                    }
                    setOpen(!open);
                  }}
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                      {field.value && selectedOption ? (
                        <>
                          {selectedOption.imageUrl && (
                            <div className={imageContainerClassName}>
                              <img
                                src={selectedOption.imageUrl}
                                alt=""
                                className={imageClassName}
                              />
                            </div>
                          )}
                          <div className="flex flex-col space-y-1">
                            <div className="text-left">
                              {selectedOption.label}
                            </div>
                            {selectedOption.description && (
                              <div className="text-muted-foreground text-xs">
                                {selectedOption.description}
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        selectPlaceholder
                      )}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="z-50 p-0"
                style={{ width: "var(--radix-popover-trigger-width)" }}
                onOpenAutoFocus={(e) => e.preventDefault()}
                onCloseAutoFocus={(e) => e.preventDefault()}
                onPointerDownOutside={() => {
                  setOpen(false);
                }}
                onEscapeKeyDown={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                }}
                onFocusOutside={(e) => {
                  e.preventDefault();
                }}
              >
                <Command className="max-h-[300px] overflow-hidden">
                  <CommandInput
                    placeholder={searchPlaceholder}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        e.stopPropagation();
                      }
                    }}
                  />
                  <CommandList
                    id="command-list"
                    className="max-h-[240px] overflow-y-auto"
                    onWheel={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                  >
                    <CommandEmpty>{notFoundPlaceholder}</CommandEmpty>
                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          value={option.label}
                          key={option.value}
                          onSelect={(currentValue) => {
                            const selectedOption = options.find(
                              (opt) =>
                                opt.label.toLowerCase() ===
                                currentValue.toLowerCase()
                            );
                            if (selectedOption) {
                              field.onChange(selectedOption.value);
                              setOpen(false);
                            }
                          }}
                          className="hover:cursor-pointer"
                        >
                          <div className="flex w-full items-center justify-between">
                            <div className="flex flex-col space-y-1">
                              <div
                                className={cn("flex items-center space-x-2")}
                              >
                                {option.imageUrl && (
                                  <div
                                    className={cn(
                                      "mr-2",
                                      imageContainerClassName
                                    )}
                                  >
                                    <img
                                      src={option.imageUrl}
                                      alt={option.label}
                                      className={cn(
                                        "h-5 w-5 rounded-full",
                                        imageClassName
                                      )}
                                    />
                                  </div>
                                )}
                                {option.label}
                              </div>
                              {option.description && (
                                <div className="text-muted-foreground text-xs">
                                  {option.description}
                                </div>
                              )}
                            </div>
                            <Check
                              className={cn(
                                "h-4 w-4",
                                option.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <div className="min-h-[32px] pt-1 pb-3">
              {hasError && errorMessage && (
                <ErrorDisplay error={errorMessage} />
              )}
              {description && (
                <FormDescription id={descriptionId}>
                  {description}
                </FormDescription>
              )}
            </div>
          </div>
        );
      }}
    />
  );
}
