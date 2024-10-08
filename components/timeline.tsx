import { tzOffset, tzDiffHours, extractCity, tzDiffTime } from "@/lib/timezones";
import { justifyBy } from "@/lib/common";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { useNow } from "@/hooks/useNow";

interface Props {
  baseTimeZone: string;
  baseTitle: string;
  timeZone: string;
  title?: string;
}

interface CellProps {
  value1: string | number;
  value2: string | number;
  red?: boolean;
  green?: boolean;
  current?: boolean;
}

const hours = Array.from(Array(24).keys());

function Cell(props: CellProps) {
  return (
    <div className={`border ${props.current && "border-indigo-500"} flex flex-col items-center`}>
      <div className="py-1 px-2 bg-teal-50 w-full text-center">{props.value1}</div>
      <div className={`py-1 px-2 w-full text-center ${props.red && "text-red-500"} ${props.green && "text-green-500"}`}>{props.value2}</div>
    </div>
  )
}

export default function Timeline(props: Props) {
  const now = useNow();
  const diffHours = tzDiffHours(props.timeZone, props.baseTimeZone);

  function offsetStr(hour: number): string {
    const time = tzDiffTime(props.timeZone, props.baseTimeZone);

    const hoursFix = time.minutes < 0 ? -1 : 0;
    const hours = justifyBy(time.hours + hour + hoursFix, 24);

    let result = String(hours);

    if (time.minutes !== 0) {
      const minutes = justifyBy(time.minutes, 60);
      result += minutes ? `:${minutes}` : "";
    }

    return result;
  }

  function isRedHour(hour: number): boolean {
    return diffHours < 0 && justifyBy(hour + diffHours, 24) > hour;
  }

  function isGreenHour(hour: number): boolean {
    return diffHours > 0 && justifyBy(hour + diffHours, 24) < hour;
  }

  function isCurrentHour(hour: number): boolean {
    return now.getHours() === hour;
  }

  const hasRedHour = hours.some(hour => isRedHour(hour));
  const hasGreenHour = hours.some(hour => isGreenHour(hour));

  const offset = tzOffset(props.timeZone, props.baseTimeZone);

  return (
    <>
      {offset && (
        <div className="mb-4">
          <span className="font-bold text-gray-600">Time difference:</span> {offset}
        </div>
      )}
      <div className="flex flex-wrap gap-y-2 mb-4">
        <Cell
          value1={props.baseTitle ?? "Local time"}
          value2={props.title ?? (extractCity(props.timeZone) + " time")}
        />
        {hours.map(hour => (
          <Cell
            key={hour}
            value1={hour}
            value2={offsetStr(hour)}
            red={isRedHour(hour)}
            green={isGreenHour(hour)}
            current={isCurrentHour(hour)}
          />
        ))}
      </div>
      {(hasRedHour || hasGreenHour) && (
        <div className="mt-3 flex gap-1">
          <ExclamationCircleIcon className="w-5 text-blue-500" />

          {hasRedHour && (
            <span>
              <span className="text-red-500">Red</span> means <strong>yesterday</strong>.
            </span>
          )}

          {hasGreenHour && (
            <span>
              <span className="text-green-500">Green</span> means <strong>tomorrow</strong>.
            </span>
          )}
        </div>
      )}
    </>
  )
}
