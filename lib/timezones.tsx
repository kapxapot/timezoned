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

export function extractCity(timeZone: string): string {
  const chunks = timeZone.split("/");

  return chunks[chunks.length - 1].replace("_", " ");
}

export function utcOffset(timeZone: string): string {
  return signedOffset(
    tzDiffHours(timeZone, "UTC")
  );
}

export function localOffset(timeZone: string): string {
  const offset = tzDiffHours(timeZone);

  const offsetStr = (offset === 0)
    ? "local"
    : signedOffset(offset, true) + "h";

  return offsetStr;
}

function signedOffset(offset: number, strict?: boolean): string {
  return (strict && offset > 0 || offset >= 0)
    ? "+" + offset.toString()
    : offset.toString();
}

/**
 * Returns timezone diff in hours.
 *
 * @param baseTimeZone Local if not specified.
 */
export function tzDiffHours(timeZone: string, baseTimeZone?: string): number {
  return toHours(
    tzDiff(timeZone, baseTimeZone)
  );
}

/**
 * Returns timezone diff in milliseconds.
 *
 * @param baseTimeZone Local if not specified.
 */
export function tzDiff(timeZone: string, baseTimeZone?: string): number {
  const tz = tzNow(timeZone);
  const base = tzNow(baseTimeZone);

  return tz.getTime() - base.getTime();
}

function toHours(ms: number) : number {
  return Math.round(ms / 60 / 60) / 1000;
}

export function tzNow(timeZone?: string): Date {
  return tzDate(new Date(), timeZone);
}

export function tzDate(date: Date, timeZone?: string): Date {
  const dateStr = timeZone
    ? date.toLocaleString("en-US", { timeZone: timeZone })
    : date.toLocaleString("en-US");

  return new Date(dateStr);
}

export function tzStr(timeZone: TimeZone): string {
  const offset = timeZone.rawOffsetInMinutes / 60;

  const offsetStr = offset >= 0
    ? "+" + offset.toString()
    : offset.toString()

  return timeZone.name + " (GMT" + offsetStr + ")";
}
