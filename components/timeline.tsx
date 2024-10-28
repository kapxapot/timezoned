import { HourData, isGreenHour, isRedHour, offsetStr, TimeZoneData, TimeZoneHourData } from "@/lib/timeline";
import { tzOffset } from "@/lib/timezones";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { memo, useMemo } from "react";
import TimelineItem from "./bits/timeline-item";

interface Props {
  curHour: number;
  baseTimeZone: string;
  baseTitle: string;
  timeZones: string[]
  titles: string[];
}

const Timeline = memo(function Timeline({ curHour, baseTimeZone, baseTitle, timeZones, titles }: Props) {
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
      <table className="border-separate border-spacing-0 mb-4 whitespace-nowrap">
        <tbody>
          <tr
            className="bg-teal-50 dark:bg-teal-800 dark:text-gray-300"
          >
            <td
              className={`py-1 px-2 text-left border border-gray-100 dark:border-gray-700`}
            >
              {baseTitle}
            </td>
            {hourData.map(hd => (
              <td
                key={hd.hour}
                className={`py-1 px-2 text-center border border-gray-100 dark:border-gray-700 ${hd.isCurrent && "border-x-indigo-500 dark:border-x-indigo-400 border-t-indigo-500 dark:border-t-indigo-400"}`}
              >
                {hd.hour}
              </td>
            ))}
          </tr>
          {timeZoneData.map((tz, index) => (
            <tr
              className={`group dark:text-gray-300 ${tz.isOdd && "bg-gray-50 dark:bg-gray-900"}`}
              key={index}
            >
              <td
                className={`py-1 px-2 text-left border border-gray-100 dark:border-gray-700 ${multiZone && "group-hover:border-y-green-500 group-hover:dark:border-y-green-400 group-hover:border-l-green-500 group-hover:dark:border-l-green-400"}`}
              >
                {tz.title}
              </td>
              {tz.hourData.map((hd, hIndex) => (
                <TimelineItem
                  key={hIndex}
                  hourData={hd}
                  isCurrent={hourData[hIndex].isCurrent}
                  isLast={tz.isLast}
                  withHover={multiZone}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>

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
  )
});

export default Timeline;
