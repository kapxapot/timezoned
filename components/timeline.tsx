import { IClock } from "@/lib/clock";
import { localOffset, tzDiffHours } from "@/lib/timezones";

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
    return (hour + diffHours + 24) % 24;
  }

  return (
    <>
      <div className="mb-4">
        <strong>Time difference:</strong> {localOffset(props.clock.timeZone)}
      </div>
      <div className="flex flex-wrap gap-y-2 mb-4">
        <Cell
          value1={props.baseClock.title + " hour"}
          value2={props.clock.title + " hour"}
        />
        {hours.map(hour => (
          <Cell
            key={hour}
            value1={hour}
            value2={offsetHour(hour)}
            red={diffHours < 0 && offsetHour(hour) > hour}
          />
        ))}
      </div>
      <div>
        <span className="text-red-500">Red</span> means <strong>yesterday</strong>.
      </div>
    </>
  )
}
