import { useEffect, useState } from "react";
import { format } from "date-fns";
import { tzDate } from "@/lib/timezones";

interface Props {
  timeZone: string;
}

export default function DateDisplay(props: Props) {
  const [now, setNow] = useState(new Date());

  const date = tzDate(now, props.timeZone);

  function color() {
    if (date.getDate() === now.getDate()) {
      return "";
    }

    return date.getTime() < now.getTime() ? "text-red-500" : "text-green-500";
  }

  useEffect(() => {
    setInterval(() => {
      setNow(new Date());
    }, 100);
  }, []);

  return (
    <div className={color()}>
      {format(date, "MMM d")}
    </div>
  )
}
