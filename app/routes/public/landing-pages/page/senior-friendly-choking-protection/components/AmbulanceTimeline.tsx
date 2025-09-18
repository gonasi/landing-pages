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
      <div className="w-full hidden md:grid grid-cols-3 grid-rows-2">
        <div className="flex items-center">
          <CheckCircle
            size={42}
            strokeWidth={3}
            className="flex-shrink-0 text-green-500 z-10"
          />
          <div className="h-1 w-full bg-green-500 -ml-1" />
        </div>
        <div className="flex items-center">
          <HelpCircle
            size={42}
            strokeWidth={3}
            className="flex-shrink-0 text-orange-500 z-10 -ml-1"
          />
          <div className="h-1 w-full bg-orange-500 -ml-1" />
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
        <div>A</div>
        <div>B</div>
        <div>C</div>
      </div>

      {/* Mobile vertical view */}
      <div className="w-full flex flex-col md:hidden">
        {/* Step 1 */}
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <CheckCircle
              size={42}
              strokeWidth={3}
              className="flex-shrink-0 text-green-500 z-10"
            />
            <div className="w-1 h-8 bg-green-500 -mt-1" />
          </div>
          <div className="ml-4">A</div>
        </div>

        {/* Step 2 */}
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <HelpCircle
              size={42}
              strokeWidth={3}
              className="flex-shrink-0 text-orange-500 z-10 -mt-1"
            />
            <div className="w-1 h-8 bg-orange-500 -mt-1" />
          </div>
          <div className="ml-4">B</div>
        </div>

        {/* Step 3 */}
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <XCircle
              size={42}
              strokeWidth={3}
              className="flex-shrink-0 text-red-500 z-10 -mt-1"
            />
            <div className="w-1 h-8 bg-red-500 -mt-1 -mb-6" />
            <ChevronDown
              size={42}
              strokeWidth={3}
              className="flex-shrink-0 text-red-500 z-10 -mt-1"
            />
          </div>
          <div className="ml-4">C</div>
        </div>
      </div>
    </>
  );
}
