import { Badge } from 'flowbite-react';
import { utcOffset } from '@/lib/timezones';
import { IClock } from '@/lib/clock';
import { Card } from './core/card';
import TimeDisplay from './time-display';

interface Props {
  clock: IClock;
}

export function StaticClockCard(props: Props) {
  const clock: IClock = props.clock;

  return (
    <Card>
      <h3 className="inline-flex font-bold -mt-0.5">
        {clock.title}
      </h3>
      <div className="-mt-1">
        <TimeDisplay
          timeZone={clock.timeZone}
        />
      </div>
      <div>{clock.timeZone}</div>
      <div className="flex flex-wrap gap-1">
        <Badge color="success">
          GMT{utcOffset(clock.timeZone)}
        </Badge>
      </div>
    </Card>
  )
}
