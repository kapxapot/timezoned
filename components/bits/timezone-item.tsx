import { memo } from "react";
import { getTimeZone, gmtStr } from "@/lib/timezones";
import { CheckIcon } from "@heroicons/react/20/solid";
import { commaJoin } from "@/lib/common";
import { Badge } from "flowbite-react";

interface Props {
  timeZoneName: string;
  selected: boolean;
}

const TimeZoneItem = memo(function TimeZoneItem({ timeZoneName, selected }: Props) {
  const timeZone = getTimeZone(timeZoneName);

  return (
    <>
      <div className="truncate">
        {timeZone ? (
          <>
            <div className="flex gap-1">
              <span className="font-medium">
                {timeZone.name}
              </span>
              <Badge color="success" className="ml-1">
                {gmtStr(timeZone.name)}
              </Badge>
              <Badge color="pink">
                {timeZone.abbreviation}
              </Badge>
              <Badge color="indigo">
                {timeZone.countryName}
              </Badge>
            </div>
            {timeZone.mainCities.length &&
              <div className="text-slate-400">
                {commaJoin(timeZone.mainCities)}
              </div>
            }
          </>
        ) : (
          <>
            {timeZoneName}
          </>
        )}
      </div>

      {selected &&
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <CheckIcon className="h-5 w-5" aria-hidden="true" />
        </span>
      }
    </>
  );
});

export default TimeZoneItem;
