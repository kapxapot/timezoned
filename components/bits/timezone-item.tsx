import { memo } from "react";
import { getTimeZone, gmtStr } from "@/lib/timezones";
import { CheckIcon } from "@heroicons/react/20/solid";

interface Props {
  timeZone: string;
  selected: boolean;
}

const TimeZoneItem = memo(function TimeZoneItem({ timeZone, selected }: Props) {
  const tz = getTimeZone(timeZone);
  const tzName = tz
    ? `${tz.name} (${gmtStr(tz.name)})`
    : timeZone;

  return (
    <span className="cursor-pointer">
      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
        {tzName}
      </span>

      {selected &&
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <CheckIcon className="h-5 w-5" aria-hidden="true" />
        </span>
      }
    </span>
  );
});

export default TimeZoneItem;
