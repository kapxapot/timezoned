import { tzOffset, tzDiffHours, tzDiffTime } from "@/lib/timezones";
import { justifyBy } from "@/lib/common";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { useNow } from "@/hooks/useNow";

interface Props {
  baseTimeZone: string;
  baseTitle: string;
  timeZones: string[]
  titles: string[];
}

interface CellProps {
  baseValue: string | number;
  values: (string | number)[];
  reds?: boolean[];
  greens?: boolean[];
  current?: boolean;
}

const hours = Array.from(Array(24).keys());

function Column({ baseValue, values, reds, greens, current }: CellProps) {
  return (
    <div className={`border border-x-2 dark:border-gray-700 ${current && "border-indigo-500 dark:border-indigo-400"} inline-flex flex-col items-center whitespace-nowrap`}>
      <div className="py-1 px-2 bg-teal-50 dark:bg-teal-800 dark:text-gray-300 w-full text-center">
        {baseValue}
      </div>
      {values.map((value, index) =>
        <div
          key={index}
          className={`py-1 px-2 w-full text-center dark:text-gray-400 ${reds && reds[index] && "text-red-500 dark:text-red-400"} ${greens && greens[index] && "text-green-500 dark:text-green-400"} ${index % 2 && "bg-gray-100 dark:bg-gray-900"}`}
        >
          {value}
        </div>
      )}
    </div>
  )
}

export default function Timeline({ baseTimeZone, baseTitle, timeZones, titles }: Props) {
  const multiZone = timeZones.length > 1;
  const firstTimeZone = timeZones[0];

  const now = useNow();
  const diffHours = (timeZone: string) => tzDiffHours(timeZone, baseTimeZone);

  function offsetStr(timeZone: string, hour: number): string {
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

  function isRedHour(timeZone: string, hour: number): boolean {
    const diff = diffHours(timeZone);
    return diff < 0 && justifyBy(hour + diff, 24) > hour;
  }

  function isGreenHour(timeZone: string, hour: number): boolean {
    const diff = diffHours(timeZone);
    return diff > 0 && justifyBy(hour + diff, 24) < hour;
  }

  function isCurrentHour(hour: number): boolean {
    return now.getHours() === hour;
  }

  const hasRedHour = hours.some(hour => timeZones.some(tz => isRedHour(tz, hour)));
  const hasGreenHour = hours.some(hour => timeZones.some(tz => isGreenHour(tz, hour)));

  const firstOffset = tzOffset(firstTimeZone, baseTimeZone);

  return (
    <>
      {!multiZone && firstOffset && (
        <div className="mb-4 dark:text-gray-400">
          <span className="font-bold">Time difference:</span> {firstOffset}
        </div>
      )}
      <div className="overflow-x-auto mb-4">
        <Column
          baseValue={baseTitle ?? "Local time"}
          values={titles}
        />
        {hours.map(hour =>
          <Column
            key={hour}
            baseValue={hour}
            values={timeZones.map(tz => offsetStr(tz, hour))}
            reds={timeZones.map(tz => isRedHour(tz, hour))}
            greens={timeZones.map(tz => isGreenHour(tz, hour))}
            current={isCurrentHour(hour)}
          />
        )}
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
  )
}
