import { useEffect, useState } from "react";
import { tzOffset, toMinutes, tzDiff, tzDiffHours, extractCity } from "@/lib/timezones";

interface Props {
  timeZone: string;
  baseTimeZone: string;
  title?: string;
  baseTitle?: string;
}

interface CellProps {
  value1: string | number;
  value2: string | number;
  red?: boolean;
  current?: boolean;
}

const hours = Array.from(Array(24).keys());

function Cell(props: CellProps) {
  return (
    <div className={`border ${props.current && "border-indigo-500"} flex flex-col items-center gap-1`}>
      <div className="py-1 px-3 bg-teal-50 w-full text-center">{props.value1}</div>
      <div className={`py-1 px-3 w-full text-center ${props.red && "text-red-500"}`}>{props.value2}</div>
    </div>
  )
}

export default function Timeline(props: Props) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setNow(new Date());
    }, 100);
  }, []);

  const diffHours = tzDiffHours(props.timeZone, props.baseTimeZone);

  function offsetHour(hour: number): number {
    return (hour + 24) % 24;
  }

  function offsetStr(hour: number): string {
    const offset = diffHours;

    const hours = Math.trunc(offset);
    const diff = tzDiff(props.timeZone, props.baseTimeZone);
    const minutes = toMinutes(diff) - hours * 60;

    return `${offsetHour(hour + hours)}${minutes ? `:${minutes}` : ""}`;
  }

  function isRedHour(hour: number): boolean {
    return diffHours < 0 && offsetHour(hour + diffHours) > hour;
  }

  function isCurrentHour(hour: number): boolean {
    return new Date().getHours() === hour;
  }

  return (
    <>
      <div className="mb-4">
        <strong>Time difference:</strong> {tzOffset(props.timeZone, props.baseTimeZone)}
      </div>
      <div className="flex flex-wrap gap-y-2 mb-4">
        <Cell
          value1={props.baseTitle ?? (extractCity(props.baseTimeZone) + " time")}
          value2={props.title ?? (extractCity(props.timeZone) + " time")}
        />
        {hours.map(hour => (
          <Cell
            key={hour}
            value1={hour}
            value2={offsetStr(hour)}
            red={isRedHour(hour)}
            current={isCurrentHour(hour)}
          />
        ))}
      </div>
      {hours.some(hour => isRedHour(hour)) && (
        <div>
          <span className="text-red-500">Red</span> means <strong>yesterday</strong>.
        </div>
      )}
    </>
  )
}
