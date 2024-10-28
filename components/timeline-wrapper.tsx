import { useNow } from "@/hooks/useNow";
import Timeline from "./timeline";
import { IClock } from "@/lib/clock";

interface Props {
  defaultClock: IClock;
  timeZones: string[];
  titles: string[];
}

export default function TimelineWrapper({ defaultClock, timeZones, titles }: Props) {
  const { curHour } = useNow();

  return (
    <Timeline
      curHour={curHour}
      baseTimeZone={defaultClock.timeZone}
      baseTitle={defaultClock.title}
      timeZones={timeZones}
      titles={titles}
    />
  );
}
