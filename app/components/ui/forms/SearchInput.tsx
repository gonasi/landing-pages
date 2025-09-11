import { useDeferredValue, useEffect, useRef, useState } from "react";
import { useNavigation, useSearchParams } from "react-router";
import debounce from "lodash.debounce";
import { LoaderCircle, Search } from "lucide-react";

import { Input } from "~/components/ui/input";

interface SearchInputProps {
  queryParam?: string;
  debounceMs?: number;
  placeholder?: string;
  disabled?: boolean;
}

export const SearchInput = ({
  queryParam = "name",
  debounceMs = 300,
  placeholder = "Search...",
  disabled,
}: SearchInputProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();

  // Initialize from query param
  const [value, setValue] = useState(() => searchParams.get(queryParam) ?? "");
  const deferredValue = useDeferredValue(value);

  // Track if we're currently searching
  const isSearching = navigation.state === "loading" && value.length > 0;

  const debouncedSetSearchParams = useRef(
    debounce((newValue: string) => {
      setSearchParams(
        (prev) => {
          const newParams = new URLSearchParams(prev);

          if (newValue) {
            newParams.set(queryParam, newValue);
          } else {
            newParams.delete(queryParam);
          }

          // Reset to page 1 when searching
          newParams.set("page", "1");

          return newParams;
        },
        { replace: true }
      );
    }, debounceMs)
  ).current;

  // Sync value -> query param
  useEffect(() => {
    debouncedSetSearchParams(deferredValue);
    return () => debouncedSetSearchParams.cancel();
  }, [deferredValue, debouncedSetSearchParams]);

  // Sync query param -> value on back/forward nav
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const paramValue = searchParams.get(queryParam) ?? "";
    if (paramValue !== value) {
      setValue(paramValue);
    }
  }, [searchParams, queryParam]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const handleClear = () => {
    setValue("");
  };

  return (
    <div className="max-w-md">
      <div className="relative max-w-sm flex-1">
        {isSearching ? (
          <LoaderCircle className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform animate-spin" />
        ) : (
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
        )}

        <Input
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="pl-10"
          disabled={disabled}
        />
        {isSearching && (
          <div className="bg-secondary/50 pointer-events-none absolute inset-0 rounded-full opacity-20" />
        )}
      </div>
      {deferredValue.length > 1 && (
        <div className="pt-2 md:pt-4">
          <span className="font-secondary text-muted-foreground text-sm">
            Results for{" "}
            <span className="text-primary font-bold">{deferredValue}</span>
            {searchParams.get("all") === "true" && (
              <span className="ml-1">(all)</span>
            )}
            {isSearching && (
              <span className="text-secondary ml-2 animate-pulse">
                • Searching...
              </span>
            )}
          </span>
        </div>
      )}
    </div>
  );
};
