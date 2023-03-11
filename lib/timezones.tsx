import { getTimeZones, TimeZone } from "@vvo/tzdb";

export function sortTimeZones(timeZones: TimeZone[]): TimeZone[] {
  return timeZones.sort(
    (tzA, tzB) => tzA.name.localeCompare(tzB.name)
  );
}

export const timeZones = getTimeZones({ includeUtc: true });
export const sortedTimeZones = sortTimeZones(timeZones);

export function getTimeZone(name?: string): TimeZone | undefined {
  return timeZones.find(tz => tz.name === name);
}

export function getTimeZoneByAbbr(abbr: string): TimeZone | undefined {
  return timeZones.find(tz => tz.abbreviation.toLowerCase() === abbr.toLowerCase());
}

export function filterTimeZones(query: string): TimeZone[] {
  return timeZones.filter(tz => timeZoneMatches(query, tz.name));
}

export function extractCity(timeZone: string): string {
  const chunks = timeZone.split("/");

  return chunks[chunks.length - 1].replace("_", " ");
}

function matches(query: string, value?: string): boolean {
  if (!value) {
    return false;
  }

  return value
    .toLowerCase()
    .replace(/(\s|_|\/)+/g, "")
    .includes(query.toLowerCase().replace(/\s+/g, ""));
}

export function timeZoneMatches(query: string, timeZoneName?: string): boolean {
  if (matches(query, timeZoneName)) {
    return true;
  }

  const timeZone = getTimeZone(timeZoneName);

  if (!timeZone) {
    return false;
  }

  return matches(query, timeZone.abbreviation)
    || matches(query, timeZone.countryName)
    || timeZone.mainCities.some(city => matches(query, city));
}

export function utcOffset(timeZone: string): string {
  return signedOffset(
    tzDiffHours(timeZone, "UTC")
  );
}

export function localOffset(timeZone: string): string {
  return tzOffset(timeZone);
}

export function tzOffset(timeZone: string, baseTimeZone?: string): string {
  const offset = tzDiffHours(timeZone, baseTimeZone);

  if (offset === 0) {
    return "local";
  }

  const hours = Math.trunc(offset);
  const minutes = toMinutes(tzDiff(timeZone, baseTimeZone)) - hours * 60;

  return `${signedOffset(hours, true)}h${minutes ? ` ${minutes}m` : ""}`;
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
  const now = new Date();
  const tz = tzDate(now, timeZone);
  const base = tzDate(now, baseTimeZone);

  return tz.getTime() - base.getTime();
}

export function toMinutes(ms: number): number {
  return ms / 60 / 1000;
}

function toHours(ms: number): number {
  return toMinutes(ms) / 60;
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
