import { format } from "date-fns";
import { tzDate } from "@/lib/timezones";
import { useNow } from "@/hooks/useNow";

interface Props {
  timeZone: string;
}

export default function DateDisplay(props: Props) {
  const { now } = useNow();
  const date = tzDate(now, props.timeZone);

  function color() {
    if (date.getDate() === now.getDate()) {
      return "dark:text-gray-400";
    }

    return date.getTime() < now.getTime()
      ? "text-red-500 dark:text-red-400"
      : "text-green-500 dark:text-green-400";
  }

  return (
    <div className={color()}>
      {format(date, "MMM d")}
    </div>
  )
}
