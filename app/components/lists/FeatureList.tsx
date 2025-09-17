import { CheckCircle } from "lucide-react";

type Feature = {
  title: string;
  description: string;
};

type FeatureListProps = {
  features: Feature[];
  className?: string;
  checkStyles?: string;
};

export function FeatureList({
  features,
  className,
  checkStyles,
}: FeatureListProps) {
  return (
    <ul className={`space-y-4 pl-2 md:pl-6 ${className ?? ""}`}>
      {features.map((item, idx) => (
        <li key={idx} className="flex items-start space-x-3">
          <CheckCircle
            strokeWidth={3}
            className={`text-green-600 w-6 h-6 shrink-0 mt-1 ${checkStyles}`}
          />
          <div>
            <span className="font-bold text-gray-900">{item.title}: </span>
            <span className="text-gray-700">{item.description}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
