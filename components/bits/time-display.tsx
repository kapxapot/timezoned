import { format } from "date-fns";
import { tzDate } from "@/lib/timezones";
import { useNow } from "@/hooks/useNow";

interface Props {
  timeZone: string;
  color?: string;
}

export default function TimeDisplay(props: Props) {
  const now = useNow();

  return (
    <div className={`${props.color ?? "text-indigo-500"} text-5xl`}>
      {format(tzDate(now, props.timeZone), "HH:mm")}
    </div>
  )
}
