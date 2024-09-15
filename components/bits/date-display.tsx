import { format } from "date-fns";
import { tzDate } from "@/lib/timezones";
import { useNow } from "@/hooks/useNow";

interface Props {
  timeZone: string;
}

export default function DateDisplay(props: Props) {
  const now = useNow();
  const date = tzDate(now, props.timeZone);

  function color() {
    if (date.getDate() === now.getDate()) {
      return "";
    }

    return date.getTime() < now.getTime() ? "text-red-500" : "text-green-500";
  }

  return (
    <div className={color()}>
      {format(date, "MMM d")}
    </div>
  )
}
