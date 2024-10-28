import { TimeZoneHourData } from "@/lib/timeline";
import { memo } from "react";

interface Props {
  hourData: TimeZoneHourData;
  isCurrent: boolean;
  isLast: boolean;
  withHover: boolean;
};

const TimelineItem = memo(function TimelineItem({ hourData, isCurrent, isLast, withHover }: Props) {
  return (
    <td
      className={`py-1 px-2 text-center border border-gray-100 dark:border-gray-700 ${isCurrent && "border-x-indigo-500 dark:border-x-indigo-400"} ${isLast && isCurrent && " border-b-indigo-500 dark:border-b-indigo-400"} ${hourData.isRed && "text-red-500 dark:text-red-400"} ${hourData.isGreen && "text-green-500 dark:text-green-400"} ${withHover && "group-hover:border-y-green-500 group-hover:dark:border-y-green-400"} ${withHover && hourData.isLast && "group-hover:border-r-green-500 group-hover:dark:border-r-green-400"}`}
    >
      {hourData.offset}
    </td>
  );
});

export default TimelineItem;
