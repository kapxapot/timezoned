import { useNow } from "@/hooks/useNow";
import Timeline from "./timeline";
import { IClock } from "@/lib/clock";
import { memo, useMemo } from "react";
import { tzOffset } from "@/lib/timezones";
import { HourData, isGreenHour, isRedHour, offsetStr, TimeZoneData, TimeZoneHourData } from "@/lib/timeline";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

interface Props {
  defaultClock: IClock;
  timeZones: string[];
  titles: string[];
}

const TimelineWrapper = memo(function TimelineWrapper({ defaultClock, timeZones, titles }: Props) {
  const { curHour } = useNow();

  const baseTimeZone = defaultClock.timeZone;
  const multiZone = timeZones.length > 1;
  const firstTimeZone = timeZones[0];

  const firstOffset = tzOffset(firstTimeZone, baseTimeZone);

  const hourData: HourData[] = useMemo(() => {
    const hours = Array.from(Array(24).keys());

    return hours.map((hour, index) => ({
      hour,
      isCurrent: hour === curHour,
      isLast: index === hours.length - 1
    }));
  }, [curHour]);

  const timeZoneData: TimeZoneData[] = useMemo(() => {
    return timeZones.map((timeZone, index) => ({
      timeZone,
      title: titles[index],
      isOdd: index % 2 === 1,
      isLast: index === timeZones.length - 1,
      hourData: hourData.map((hd): TimeZoneHourData => ({
        offset: offsetStr(baseTimeZone, timeZone, hd.hour),
        isRed: isRedHour(baseTimeZone, timeZone, hd.hour),
        isGreen: isGreenHour(baseTimeZone, timeZone, hd.hour),
        isLast: hd.isLast
      }))
    }));
  }, [baseTimeZone, timeZones, titles, hourData]);

  const hasRedHour = hourData.some(hd => timeZones.some(tz => isRedHour(baseTimeZone, tz, hd.hour)));
  const hasGreenHour = hourData.some(hd => timeZones.some(tz => isGreenHour(baseTimeZone, tz, hd.hour)));

  return (
    <>
      {!multiZone && firstOffset && (
        <div className="mb-4 dark:text-gray-400">
          <span className="font-bold">Time difference:</span> {firstOffset}
        </div>
      )}

      <div className="max-w-7xl overflow-x-auto">
        <Timeline
          baseTitle={defaultClock.title}
          hourData={hourData}
          timeZoneData={timeZoneData}
        />
      </div>

      {(hasRedHour || hasGreenHour) && (
        <div className="mt-3 flex gap-1">
          <ExclamationCircleIcon className="w-5 text-blue-500" />

          {hasRedHour && (
            <span className="dark:text-gray-400">
              <span className="text-red-500 dark:text-red-400">Red</span> means <strong>yesterday</strong>.
            </span>
          )}

          {hasGreenHour && (
            <span className="dark:text-gray-400">
              <span className="text-green-500 dark:text-green-400">Green</span> means <strong>tomorrow</strong>.
            </span>
          )}
        </div>
      )}
    </>
  );
});

export default TimelineWrapper;
