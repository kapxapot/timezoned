import { Badge } from 'flowbite-react';
import { utcOffset } from '@/lib/timezones';
import { IClock } from '@/lib/clock';
import { Card } from './core/card';
import TimeDisplay from './time-display';
import DateDisplay from './date-display';

interface Props {
  clock: IClock;
  className?: string;
}

export function DefaultClockCard(props: Props) {
  const clock: IClock = props.clock;

  return (
    <Card className={props.className}>
      <h3 className="inline-flex font-bold -mt-0.5">
        {clock.title}
      </h3>
      <div className="-mt-1">
        <TimeDisplay
          timeZone={clock.timeZone}
          color="text-green-500"
        />
      </div>
      <div className="mb-1">
        <DateDisplay
          timeZone={clock.timeZone}
        />
      </div>
      <div className="flex flex-wrap gap-1">
        <Badge color="gray">
          {clock.timeZone}
        </Badge>
        <Badge color="success">
          GMT{utcOffset(clock.timeZone)}
        </Badge>
      </div>
    </Card>
  )
}
