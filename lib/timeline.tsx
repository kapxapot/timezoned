import { justifyBy } from "./common";
import { tzDiffHours, tzDiffTime } from "./timezones";

export type HourData = {
  hour: number;
  isCurrent: boolean;
  isLast: boolean;
};

export type TimeZoneHourData = {
  offset: string;
  isRed: boolean;
  isGreen: boolean;
  isLast: boolean;
};

export type TimeZoneData = {
  timeZone: string;
  title: string;
  isOdd: boolean;
  isLast: boolean;
  hourData: TimeZoneHourData[];
};

export function isRedHour(baseTimeZone: string, timeZone: string, hour: number): boolean {
  const diff = diffHours(baseTimeZone, timeZone);
  return diff < 0 && justifyBy(hour + diff, 24) > hour;
}

export function isGreenHour(baseTimeZone: string, timeZone: string, hour: number): boolean {
  const diff = diffHours(baseTimeZone, timeZone);
  return diff > 0 && justifyBy(hour + diff, 24) < hour;
}

export function offsetStr(baseTimeZone: string, timeZone: string, hour: number): string {
  const time = tzDiffTime(timeZone, baseTimeZone);

  const hoursFix = time.minutes < 0 ? -1 : 0;
  const hours = justifyBy(time.hours + hour + hoursFix, 24);

  let result = String(hours);

  if (time.minutes !== 0) {
    const minutes = justifyBy(time.minutes, 60);
    result += minutes ? `:${minutes}` : "";
  }

  return result;
}

const diffHours = (baseTimeZone: string, timeZone: string) => tzDiffHours(timeZone, baseTimeZone);
