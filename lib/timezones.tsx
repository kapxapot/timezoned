import { getTimeZones, TimeZone } from "@vvo/tzdb";

export function sortTimeZones(timeZones: TimeZone[]): TimeZone[] {
  return timeZones.sort(
    (tzA, tzB) => tzA.name.localeCompare(tzB.name)
  );
}

export const timeZones = getTimeZones({ includeUtc: true });
export const sortedTimeZones = sortTimeZones(timeZones);

export function getTimeZone(name: string): TimeZone | undefined {
  return timeZones.find(tz => tz.name === name);
}

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
