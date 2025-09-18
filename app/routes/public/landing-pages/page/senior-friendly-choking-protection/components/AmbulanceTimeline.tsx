import {
  ChevronRight,
  CircleCheck,
  CircleQuestionMark,
  CircleX,
} from "lucide-react";

export function AmbulanceTimeline() {
  return (
    <>
      <div className="w-full hidden md:grid grid-cols-3 grid-rows-2">
        <div className="flex items-center">
          <CircleCheck
            size={42}
            strokeWidth={3}
            className="flex-shrink-0 text-green-500 z-10"
          />
          <div className="h-1 w-full bg-green-500 -ml-1" />
        </div>
        <div className="flex items-center">
          <CircleQuestionMark
            size={42}
            strokeWidth={3}
            className="flex-shrink-0 text-orange-500 z-10 -ml-1"
          />
          <div className="h-1 w-full bg-orange-500 -ml-1" />
        </div>
        <div className="flex items-center">
          <CircleX
            size={42}
            strokeWidth={3}
            className="flex-shrink-0 text-red-500 z-10 -ml-1"
          />
          <div className="h-1 w-full bg-red-500 -ml-1 -mr-6" />
          <ChevronRight
            size={42}
            strokeWidth={3}
            className="flex-shrink-0 text-red-500 z-10 -ml-1"
          />
        </div>
        <div>A</div>
        <div>B</div>
        <div>C</div>
      </div>

      <div className="w-full grid grid-flow-col grid-rows-3 md:hidden">
        <div>01</div>
        <div>02</div>
        <div>03</div>
        <div>A</div>
        <div>B</div>
        <div>C</div>
      </div>
    </>
  );
}
