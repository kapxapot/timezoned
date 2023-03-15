import { useEffect, useState } from "react";
import { format } from "date-fns";
import { tzNow } from "@/lib/timezones";

interface Props {
  timeZone: string;
}

export default function DateDisplay(props: Props) {
  const [now, setNow] = useState(new Date());

  const date = tzNow(props.timeZone);

  function color() {
    if (date.getDay() < now.getDay()) {
      return "text-red-500";
    }

    if (date.getDay() > now.getDay()) {
      return "text-green-500";
    }

    return "";
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
