import { useEffect, useState } from 'react';
import { format } from 'date-fns';

interface Props {
  name: string;
}

export default function Clock({ name }: Props) {
  const [now, setNow] = useState(new Date());

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

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
      <div className="text-5xl -mt-1">
        {format(now, 'HH:mm')}
      </div>
      <div>{timezone}</div>
    </div>
  )
}
