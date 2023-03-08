import { format } from 'date-fns';
import { Badge } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { utcOffset, tzNow } from '@/lib/timezones';
import { IClock } from '@/lib/clock';
import { Card } from './core/card';

interface Props {
  clock: IClock;
}

export function StaticClockCard(props: Props) {
  const [now, setNow] = useState(new Date());

  const clock: IClock = props.clock;

  useEffect(() => {
    setInterval(() => {
      setNow(new Date());
    }, 100);
  }, []);

  return (
    <Card>
      <h3 className="inline-flex font-bold">
        {clock.title}
      </h3>
      <div className="text-indigo-500 text-5xl -mt-1">
        {format(tzNow(clock.timeZone), 'HH:mm')}
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
