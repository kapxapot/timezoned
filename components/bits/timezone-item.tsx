import { memo } from "react";
import { getTimeZone, gmtStr } from "@/lib/timezones";
import { commaJoin } from "@/lib/common";
import { Badge } from "flowbite-react";

interface Props {
  timeZoneName: string;
}

const TimeZoneItem = memo(function TimeZoneItem({ timeZoneName }: Props) {
  const timeZone = getTimeZone(timeZoneName);

  return (
    <div className="truncate text-gray-900 dark:text-gray-200">
      {timeZone ? (
        <>
          <div className="flex items-center gap-1">
            <span className="font-medium">
              {timeZone.name}
            </span>
            <Badge color="success" className="ml-1">
              {gmtStr(timeZone.name)}
            </Badge>
            <Badge color="pink">
              {timeZone.abbreviation}
            </Badge>
            {timeZone.countryName &&
              <Badge color="indigo">
                {timeZone.countryName}
              </Badge>
            }
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
  )
});

export default TimeZoneItem;
