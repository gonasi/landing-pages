import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  Shield,
  Users,
  Zap,
  Package,
} from "lucide-react";

interface ComparisonFeature {
  name: string;
  description: string;
  icon: React.ReactNode;
  ourProduct: {
    status: "positive" | "negative" | "neutral";
    value: string;
  };
  competitor: {
    status: "positive" | "negative" | "neutral";
    value: string;
  };
}

const features: ComparisonFeature[] = [
  {
    name: "Effectiveness",
    description:
      "Designed to help remove airway blockages fast, when seconds matter most.",
    icon: <Zap className="w-5 h-5" />,
    ourProduct: {
      status: "positive",
      value: "Fast & Effective",
    },
    competitor: {
      status: "negative",
      value: "Limited Effectiveness",
    },
  },
  {
    name: "Easy to Use for Seniors",
    description:
      "Designed to be simple and easy for seniors, even in a stressful situation.",
    icon: <Users className="w-5 h-5" />,
    ourProduct: {
      status: "positive",
      value: "Senior-Friendly Design",
    },
    competitor: {
      status: "negative",
      value: "Complex Operation",
    },
  },
  {
    name: "One-Way Valve",
    description:
      "Has a one-way valve that makes sure the suction works the right way to clear blockages effectively.",
    icon: <CheckCircle className="w-5 h-5" />,
    ourProduct: {
      status: "positive",
      value: "Advanced One-Way Valve",
    },
    competitor: {
      status: "negative",
      value: "No One-Way Valve",
    },
  },
  {
    name: "Compact & Portable",
    description:
      "Small, lightweight, and easy to carry in your home, car, or purse.",
    icon: <Package className="w-5 h-5" />,
    ourProduct: {
      status: "positive",
      value: "Ultra-Portable",
    },
    competitor: {
      status: "negative",
      value: "Bulky Design",
    },
  },
  {
    name: "Suction Power",
    description: "Strong suction capability for effective airway clearance.",
    icon: <Zap className="w-5 h-5" />,
    ourProduct: {
      status: "positive",
      value: "Powerful Suction",
    },
    competitor: {
      status: "negative",
      value: "Weak Suction",
    },
  },
  {
    name: "FDA Clearance",
    description: "FDA-cleared for safety and effectiveness.",
    icon: <Shield className="w-5 h-5" />,
    ourProduct: {
      status: "positive",
      value: "FDA-Cleared",
    },
    competitor: {
      status: "negative",
      value: "Not FDA-Cleared",
    },
  },
];

function StatusIcon({
  status,
}: {
  status: "positive" | "negative" | "neutral";
}) {
  switch (status) {
    case "positive":
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    case "negative":
      return <XCircle className="w-5 h-5 text-red-600" />;
    default:
      return <div className="w-5 h-5 rounded-full bg-muted" />;
  }
}

function StatusBadge({
  status,
  value,
}: {
  status: "positive" | "negative" | "neutral";
  value: string;
}) {
  const variant =
    status === "positive"
      ? "default"
      : status === "negative"
        ? "destructive"
        : "secondary";

  return (
    <Badge variant={variant} className="font-medium">
      {value}
    </Badge>
  );
}

export function ComparisonTable() {
  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        {/* header: same grid template so columns line up */}
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_4rem_4rem] gap-6 items-center px-4">
          <div></div>
          <div className="text-center">
            <h2 className="text-xl font-semibold">VitalVac</h2>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold">Imitators</h2>
          </div>
        </div>
      </div>

      <div className="divide-y divide-border">
        {features.map((feature, index) => (
          <div
            key={feature.name}
            className={`grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_4rem_4rem] gap-6 p-6 items-start ${
              index % 2 === 0 ? "bg-background" : "bg-muted/30"
            }`}
          >
            {/* First column: text, allow shrinking with min-w-0 */}
            <div className="space-y-2 min-w-0">
              <div className="flex items-center gap-3">
                <div className="text-primary">{feature.icon}</div>
                <h3 className="font-semibold text-foreground truncate">
                  {feature.name}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>

            {/* Second column: centered icon (our product) */}
            <div className="flex flex-col items-center justify-center space-y-3">
              <StatusIcon status={feature.ourProduct.status} />
            </div>

            {/* Third column: centered icon (competitor) */}
            <div className="flex flex-col items-center justify-center space-y-3">
              <StatusIcon status={feature.competitor.status} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card p-6 border-t">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold text-card-foreground">
            Choose the Right Device for Your Safety
          </h3>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            When seconds matter most, trust in a device that combines
            effectiveness, ease of use, and FDA clearance for your peace of
            mind.
          </p>
        </div>
      </div>
    </Card>
  );
}
