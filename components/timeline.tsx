import { HourData, TimeZoneData } from "@/lib/timeline";
import { memo } from "react";
import TimelineItem from "./bits/timeline-item";

interface Props {
  baseTitle: string;
  hourData: HourData[];
  timeZoneData: TimeZoneData[];
}

const Timeline = memo(function Timeline({ baseTitle, hourData, timeZoneData }: Props) {
  const multiZone = timeZoneData.length > 1;

  return (
    <table className="border-separate border-spacing-0 mb-4 whitespace-nowrap">
      <tbody>
        <tr
          className="bg-teal-50 dark:bg-teal-800 dark:text-gray-300"
        >
          <td
            className={`py-1 px-2 text-left border border-gray-100 dark:border-gray-700`}
          >
            {baseTitle}
          </td>
          {hourData.map(hd => (
            <td
              key={hd.hour}
              className={`py-1 px-2 text-center border border-gray-100 dark:border-gray-700 ${hd.isCurrent && "border-x-indigo-500 dark:border-x-indigo-400 border-t-indigo-500 dark:border-t-indigo-400"}`}
            >
              {hd.hour}
            </td>
          ))}
        </tr>
        {timeZoneData.map((tz, index) => (
          <tr
            className={`group dark:text-gray-300 ${tz.isOdd && "bg-gray-50 dark:bg-gray-900"}`}
            key={index}
          >
            <td
              className={`py-1 px-2 text-left border border-gray-100 dark:border-gray-700 ${multiZone && "group-hover:border-y-green-500 group-hover:dark:border-y-green-400 group-hover:border-l-green-500 group-hover:dark:border-l-green-400"}`}
            >
              {tz.title}
            </td>
            {tz.hourData.map((hd, hIndex) => (
              <TimelineItem
                key={hIndex}
                hourData={hd}
                isCurrent={hourData[hIndex].isCurrent}
                isLast={tz.isLast}
                withHover={multiZone}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
});

export default Timeline;
