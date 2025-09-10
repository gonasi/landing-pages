import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Eye, ImageIcon } from "lucide-react";
import { useNavigate } from "react-router";

type Creative = {
  id: string;
  image_url?: string | null;
  name: string;
  created_at: string;
  headline?: string | null;
  body_text?: string | null;
  call_to_action?: string | null;
};

type CreativeCardProps = {
  creative: Creative;
  onPreview?: (creative: Creative) => void;
  onEdit?: (creative: Creative) => void;
};

export function CreativeCard({
  creative,
  onPreview,
  onEdit,
}: CreativeCardProps) {
  const navigate = useNavigate();

  return (
    <Card key={creative.id} className="overflow-hidden">
      <div className="aspect-video relative bg-muted">
        <img
          src={creative.image_url || "/placeholder.svg"}
          alt={creative.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="gap-1">
            <ImageIcon className="h-3 w-3" />
            Creative
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg">{creative.name}</h3>
            <p className="text-sm text-muted-foreground">
              Created {new Date(creative.created_at).toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-2">
            {creative.headline && (
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">
                  HEADLINE
                </h4>
                <p className="font-semibold">{creative.headline}</p>
              </div>
            )}

            {creative.body_text && (
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">
                  BODY TEXT
                </h4>
                <p className="text-sm leading-relaxed">{creative.body_text}</p>
              </div>
            )}

            {creative.call_to_action && (
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">
                  CALL TO ACTION
                </h4>
                <Badge variant="outline">{creative.call_to_action}</Badge>
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            {onPreview && (
              <Button
                size="sm"
                variant="outline"
                className="gap-1 bg-transparent"
                onClick={() => navigate(`/ads/push/${creative.id}`)}
              >
                Push To Meta Ads
              </Button>
            )}
            {onEdit && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(creative)}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
