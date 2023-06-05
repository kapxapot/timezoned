import { useEffect, useState } from "react";
import { format } from "date-fns";
import { tzDate } from "@/lib/timezones";

interface Props {
  timeZone: string;
  color?: string;
}

export default function TimeDisplay(props: Props) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setNow(new Date());
    }, 100);
  }, []);

  return (
    <div className={`${props.color ?? "text-indigo-500"} text-5xl`}>
      {format(tzDate(now, props.timeZone), "HH:mm")}
    </div>
  )
}
