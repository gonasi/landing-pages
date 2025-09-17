import { cn } from "~/lib/utils";

type FeatureCardProps = {
  src: string;
  alt: string;
  title: string;
  className?: string;
};

export function FeatureCard({ src, alt, title, className }: FeatureCardProps) {
  return (
    <div className={cn("flex flex-col items-center w-40", className)}>
      <img src={src} alt={alt} className="h-10 w-12 object-contain" />
      <h4 className="font-extrabold text-center py-2">{title}</h4>
    </div>
  );
}
