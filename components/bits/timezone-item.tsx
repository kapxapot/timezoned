import { getTimeZone, gmtStr } from "@/lib/timezones";
import { memo } from "react";

interface Props {
  timeZone: string;
}

const TimeZoneItem = memo(function TimeZoneItem({ timeZone }: Props) {
  const tz = getTimeZone(timeZone);

  return (
    <>
      {tz
        ? `${tz.name} (${gmtStr(tz.name)})`
        : timeZone
      }
    </>
  );
});

export default TimeZoneItem;
