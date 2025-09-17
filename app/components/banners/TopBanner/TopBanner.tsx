import { cn } from "~/lib/utils";

type TopBannerProps = {
  children: React.ReactNode;
  className?: string;
};

export function TopBanner({ children, className }: TopBannerProps) {
  return (
    <section
      className={cn(
        "bg-gradient-to-r from-blue-600 to-blue-400 text-white",
        "w-full py-8 px-6 flex flex-col items-center justify-center",
        "shadow-md",
        className
      )}
    >
      <div className="max-w-3xl text-center space-y-3">{children}</div>
    </section>
  );
}
