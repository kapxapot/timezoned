import { Badge } from 'flowbite-react';
import { gmtStr } from '@/lib/timezones';
import { IClock } from '@/lib/clock';
import { Card } from './core/card';
import TimeDisplay from './bits/time-display';
import DateDisplay from './bits/date-display';

interface Props {
  clock: IClock;
  className?: string;
}

export function DefaultClockCard(props: Props) {
  const clock = props.clock;
  const timeZone = clock.timeZone;

  return (
    <Card className={props.className}>
      <h3 className="inline-flex font-bold -mt-0.5 dark:text-gray-400">
        {clock.title}
      </h3>
      <div className="-mt-1">
        <TimeDisplay
          timeZone={timeZone}
          color="text-green-500 dark:text-green-400"
        />
      </div>
      <div className="mb-1">
        <DateDisplay
          timeZone={timeZone}
        />
      </div>
      <div className="flex flex-wrap gap-1">
        <Badge color="gray">
          {timeZone}
        </Badge>
        <Badge color="success">
          {gmtStr(timeZone)}
        </Badge>
      </div>
    </Card>
  )
}
