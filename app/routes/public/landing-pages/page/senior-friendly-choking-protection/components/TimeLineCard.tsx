import { Card, CardContent } from "~/components/ui/card";

interface ITimelineCardProps {
  image: string;
  title: string;
  description: string;
}

export function TimeLineCard({
  image,
  title,
  description,
}: ITimelineCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col md:flex-row space-x-0 md:space-x-8 space-y-4 md:space-y-0">
        <div className="w-full md:w-150">
          <div className="flex items-center justify-center space-x-4">
            <img src={image} alt="ambulance" className="w-20 object-contain" />
            <div>
              <h3 className="text-2xl font-bold">{title}</h3>
              <p className="py-2">{description}</p>
            </div>
          </div>
        </div>
        <div className="w-full">right</div>
      </CardContent>
    </Card>
  );
}
