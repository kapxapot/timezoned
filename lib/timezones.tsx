import { getTimeZones, TimeZone } from "@vvo/tzdb";

export const sortedTimeZones = getTimeZones({ includeUtc: true }).sort(
  (tzA, tzB) => tzA.name.localeCompare(tzB.name)
);

export function gmtOffset(date: Date, timeZone: string): string {
  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
  const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timeZone }));
  const offset = (tzDate.getTime() - utcDate.getTime()) / 60 / 1000 / 60;

  return offset >= 0
    ? '+' + offset.toString()
    : offset.toString();
}

export function localOffset(date: Date, timeZone: string): string {
  const utcDate = new Date(date.toLocaleString('en-US'));
  const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timeZone }));
  const offset = (tzDate.getTime() - utcDate.getTime()) / 60 / 1000 / 60;

  if (offset === 0) {
    return 'local';
  }

  const offsetStr = offset > 0
    ? '+' + offset.toString()
    : offset.toString();

  return offsetStr + 'h';
}

export function tzDate(timeZone: string): Date {
  const dateStr = new Date().toLocaleString("en-US", { timeZone: timeZone });
  return new Date(dateStr);
}

export function tzStr(timeZone: TimeZone): string {
  const offset = timeZone.rawOffsetInMinutes / 60;

  const offsetStr = offset >= 0
    ? '+' + offset.toString()
    : offset.toString()

  return timeZone.name + " (GMT" + offsetStr + ")";
}
