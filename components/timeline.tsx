import { IClock } from "@/lib/clock";
import { localOffset, toMinutes, tzDiff, tzDiffHours } from "@/lib/timezones";

interface Props {
  clock: IClock;
  baseClock: IClock;
}

interface CellProps {
  value1: string | number;
  value2: string | number;
  red?: boolean;
}

const hours = Array.from(Array(24).keys());

function Cell(props: CellProps) {
  return (
    <div className="border flex flex-col items-center gap-1">
      <div className="py-1 px-3 bg-teal-50 w-full text-center">{props.value1}</div>
      <div className={`py-1 px-3 w-full text-center ${props.red && "text-red-500"}`}>{props.value2}</div>
    </div>
  )
}

export default function Timeline(props: Props) {
  const diffHours = tzDiffHours(props.clock.timeZone, props.baseClock.timeZone);

  function offsetHour(hour: number): number {
    return (hour + 24) % 24;
  }

  function offsetStr(hour: number): string {
    const offset = diffHours;

    const hours = Math.trunc(offset);
    const diff = tzDiff(props.clock.timeZone, props.baseClock.timeZone);
    const minutes = toMinutes(diff) - hours * 60;

    return `${offsetHour(hour + hours)}${minutes ? `:${minutes}` : ""}`;
  }

  function isRedHour(hour: number): boolean {
    return diffHours < 0 && offsetHour(hour + diffHours) > hour;
  }

  return (
    <>
      <div className="mb-4">
        <strong>Time difference:</strong> {localOffset(props.clock.timeZone)}
      </div>
      <div className="flex flex-wrap gap-y-2 mb-4">
        <Cell
          value1={props.baseClock.title + " time"}
          value2={props.clock.title + " time"}
        />
        {hours.map(hour => (
          <Cell
            key={hour}
            value1={hour}
            value2={offsetStr(hour)}
            red={isRedHour(hour)}
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
