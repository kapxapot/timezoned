import { useEffect, useState } from "react";
import { format } from 'date-fns';
import { tzNow } from "@/lib/timezones";

interface Props {
  timeZone: string;
}

export default function TimeDisplay(props: Props) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setNow(new Date());
    }, 100);
  }, []);

  return (
    <div className="text-indigo-500 text-5xl">
      {format(tzNow(props.timeZone), 'HH:mm')}
    </div>
  )
}
