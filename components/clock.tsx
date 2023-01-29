import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { gmtOffset, localOffset, tzDate } from '@/lib/timezones';

interface Props {
  name: string;
  timezone?: string;
}

export default function Clock({ name, timezone }: Props) {
  const [now, setNow] = useState(new Date());

  timezone = timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(
    () => {
      setInterval(() => {
        // Update the current time every 100ms.
        setNow(new Date());
      }, 100);
    },
    []
  );

  return (
    <div className="flex flex-col items-center gap-2 p-3 bg-slate-100 rounded-xl">
      <div className="font-bold">{name}</div>
      <div className="text-indigo-500 text-5xl -mt-1">
        {format(tzDate(timezone), 'HH:mm')}
      </div>
      <div>{timezone}</div>
      <div className="-mt-2 text-sm text-slate-400">{localOffset(now, timezone)} (GMT{gmtOffset(now, timezone)})</div>
    </div>
  )
}
