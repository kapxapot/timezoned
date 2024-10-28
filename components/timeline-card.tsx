import { IClock } from "@/lib/clock";
import { useMemo } from "react";
import TimelineWrapper from "./timeline-wrapper";

interface Props {
  defaultClock: IClock;
  customClocks: IClock[];
};

export default function TimelineCard({ defaultClock, customClocks }: Props) {
  const timeZones = useMemo(
    () => customClocks.map(clock => clock.timeZone),
    [customClocks]
  );

  const titles = useMemo(
    () => customClocks.map(clock => clock.title),
    [customClocks]
  );

  return (
    <div className="max-w-fit overflow-x-auto mx-auto rounded-lg border border-gray-200 shadow-md p-3 bg-white dark:bg-gray-800 dark:border-gray-700">
      <TimelineWrapper
        defaultClock={defaultClock}
        timeZones={timeZones}
        titles={titles}
      />
    </div>
  );
}
