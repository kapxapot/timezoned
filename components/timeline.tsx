import { tzOffset, tzDiffHours, tzDiffTime } from "@/lib/timezones";
import { justifyBy } from "@/lib/common";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { memo, useMemo } from "react";

interface Props {
  curHour: number;
  baseTimeZone: string;
  baseTitle: string;
  timeZones: string[]
  titles: string[];
}

const diffHours = (baseTimeZone: string, timeZone: string) => tzDiffHours(timeZone, baseTimeZone);

function isRedHour(baseTimeZone: string, timeZone: string, hour: number): boolean {
  const diff = diffHours(baseTimeZone, timeZone);
  return diff < 0 && justifyBy(hour + diff, 24) > hour;
}

function isGreenHour(baseTimeZone: string, timeZone: string, hour: number): boolean {
  const diff = diffHours(baseTimeZone, timeZone);
  return diff > 0 && justifyBy(hour + diff, 24) < hour;
}

function offsetStr(baseTimeZone: string, timeZone: string, hour: number): string {
  const time = tzDiffTime(timeZone, baseTimeZone);

  const hoursFix = time.minutes < 0 ? -1 : 0;
  const hours = justifyBy(time.hours + hour + hoursFix, 24);

  let result = String(hours);

  if (time.minutes !== 0) {
    const minutes = justifyBy(time.minutes, 60);
    result += minutes ? `:${minutes}` : "";
  }

  return result;
}

type HourData = {
  hour: number;
  isCurrent: boolean;
  isLast: boolean;
};

type TimeZoneHourData = {
  offset: string;
  isRed: boolean;
  isGreen: boolean;
  isLast: boolean;
};

type TimeZoneData = {
  timeZone: string;
  isOdd: boolean;
  isLast: boolean;
  hourData: TimeZoneHourData[];
};

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

  const hasRedHour = hourData.some(hd => timeZones.some(tz => isRedHour(baseTimeZone, tz, hd.hour)));
  const hasGreenHour = hourData.some(hd => timeZones.some(tz => isGreenHour(baseTimeZone, tz, hd.hour)));

  return (
    <>
      {!multiZone && firstOffset && (
        <div className="mb-4 dark:text-gray-400">
          <span className="font-bold">Time difference:</span> {firstOffset}
        </div>
      )}
      <table className="border-separate border-spacing-0 mb-4 whitespace-nowrap border border-gray-100 dark:border-gray-700">
        <tbody>
          <tr
            className="bg-teal-50 dark:bg-teal-800 dark:text-gray-300"
          >
            <td
              className={`py-1 px-2 text-left border-r border-gray-100 dark:border-gray-700 ${hourData[0].isCurrent && "border-r-2 border-indigo-500 dark:border-indigo-400"}`}
            >
              {baseTitle}
            </td>
            {hourData.map(hd => (
              <td
                key={hd.hour}
                className={`py-1 px-2 text-center border-l border-gray-100 dark:border-gray-700 ${!hd.isLast && !hd.isCurrent && "border-r"} ${hd.isCurrent && "border-l-2 border-r-2 border-t-2 border-indigo-500 dark:border-indigo-400"}`}
              >
                {hd.hour}
              </td>
            ))}
          </tr>
          {timeZones.map((timeZone, tIndex) => (
            <tr
              className={`group dark:text-gray-300 ${(tIndex % 2) && "bg-gray-50 dark:bg-gray-900"}`}
              key={tIndex}
            >
              <td
                className={`py-1 px-2 text-left border-r border-gray-100 dark:border-gray-700 ${hourData[0].isCurrent && "border-r-2 border-indigo-500 dark:border-indigo-400"} group-hover:border-y-2 group-hover:border-l-2 group-hover:border-y-green-500 group-hover:dark:border-y-green-400 group-hover:border-l-green-500 group-hover:dark:border-l-green-400`}
              >
                {titles[tIndex]}
              </td>
              {hourData.map(hd => (
                <td
                  key={hd.hour}
                  className={`py-1 px-2 text-center border-l border-gray-100 dark:border-gray-700 ${!hd.isLast && !hd.isCurrent && "border-r"} ${tIndex === timeZones.length - 1 && hd.isCurrent && "border-b-2"} ${hd.isCurrent && "border-l-2 border-r-2 border-indigo-500 dark:border-indigo-400"} ${isRedHour(baseTimeZone, timeZone, hd.hour) && "text-red-500 dark:text-red-400"} ${isGreenHour(baseTimeZone, timeZone, hd.hour) && "text-green-500 dark:text-green-400"} group-hover:border-y-2 group-hover:border-y-green-500 group-hover:dark:border-y-green-400 ${hd.isLast && "group-hover:border-r-2 group-hover:border-r-green-500 group-hover:dark:border-r-green-400"}`}
                >
                  {offsetStr(baseTimeZone, timeZone, hd.hour)}
                </td>
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
