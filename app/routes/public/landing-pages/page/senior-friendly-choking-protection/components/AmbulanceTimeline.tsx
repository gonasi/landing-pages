import {
  ChevronRight,
  CheckCircle,
  HelpCircle,
  XCircle,
  ChevronDown,
} from "lucide-react";

export function AmbulanceTimeline() {
  return (
    <>
      {/* Desktop horizontal view */}
      <div className="w-full hidden md:grid grid-cols-2 grid-rows-2">
        <div className="flex items-center">
          <div className="h-1 w-full bg-red-500" />
        </div>
        <div className="flex items-center">
          <XCircle
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
        <div></div>
        <div>
          <h3 className="text-xl font-bold pb-2">Over 10 min</h3>
          <p>oxygen starvation means the victim is likely to die.</p>
        </div>
      </div>

      {/* Mobile vertical view */}
      <div className="w-full flex flex-col md:hidden">
        {/* Step 2 */}
        <div className="flex items-center h-full">
          <div className="flex flex-col items-center">
            <XCircle
              size={42}
              strokeWidth={3}
              className="flex-shrink-0 text-red-500 z-10 -mt-1"
            />
            <div className="w-1 h-14 bg-red-500 -mt-1 -mb-6" />
            <ChevronDown
              size={42}
              strokeWidth={3}
              className="flex-shrink-0 text-red-500 z-10 -mt-1"
            />
          </div>
          <div className="ml-4">
            <div>
              <h3 className="text-xl font-bold pb-2">Over 10 min</h3>
              <p>oxygen starvation means the victim is likely to die.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
