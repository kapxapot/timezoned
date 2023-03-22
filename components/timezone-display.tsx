import { getTimeZone, gmtStr } from "@/lib/timezones";

interface Props {
  timeZone: string;
}

export default function TimeZoneDisplay(props: Props) {
  const timeZone = getTimeZone(props.timeZone);

  return (
    <>
      {timeZone ? (
        <span>
          {timeZone.name} ({gmtStr(timeZone.name)})
        </span>
      ) : (
        <span>
          {props.timeZone}
        </span>
      )}
    </>
  )
}
