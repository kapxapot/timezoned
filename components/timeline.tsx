import { IClock } from "@/lib/clock";
import { tzDiffHours } from "@/lib/timezones";
import { ReactNode } from "react";

interface Props {
  clock: IClock;
  baseClock: IClock;
}

interface CellProps {
  value1: string | number;
  value2: string | number;
}

const hours = Array.from(Array(24).keys());

function Cell(props: CellProps) {
  return (
    <div className="border flex flex-col items-center gap-1">
      <div className="py-1 px-3 bg-teal-50 w-full text-center">{props.value1}</div>
      <div className="py-1 px-3 w-full text-center">{props.value2}</div>
    </div>
  )
}

export default function Timeline(props: Props) {
  function diffHours(): number {
    return tzDiffHours(props.clock.timeZone, props.baseClock.timeZone);
  }

  function justifyHours(hour: number): number {
    return (hour + 24) % 24;
  }

  return (
    <div className="flex flex-wrap gap-y-2">
      <Cell
        value1={props.baseClock.title + " hour"}
        value2={props.clock.title + " hour"}
      />
      {hours.map(hour => (
        <Cell
          value1={hour}
          value2={justifyHours(hour + diffHours())}
        />
      ))}
    </div>
  )
}
