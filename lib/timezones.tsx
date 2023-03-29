import { getTimeZones, TimeZone } from "@vvo/tzdb";
import { ITime, Time } from "./time";

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
    .includes(query.replace(/\s+/g, ""));
}

export function timeZoneMatches(query: string, timeZoneName: string): boolean {
  const lq = query.toLowerCase();

  if (matches(lq, timeZoneName)) {
    return true;
  }

  if (lq.startsWith("gmt") && gmtStr(timeZoneName).toLowerCase().startsWith(lq)) {
    return true;
  }

  const timeZone = getTimeZone(timeZoneName);

  if (!timeZone) {
    return false;
  }

  return matches(lq, timeZone.abbreviation)
    || matches(lq, timeZone.countryName)
    || timeZone.mainCities.some(city => matches(lq, city));
}

export function utcOffset(timeZone: string): string {
  const time = tzDiffTime(timeZone, "UTC");

  const hours = `${plus(time.hours)}${time.hours}`;
  const minutes = time.minutes ? `:${Math.abs(time.minutes)}` : "";

  return `${hours}${minutes}`;
}

export function localOffset(timeZone: string): string {
  return tzOffset(timeZone);
}

export function tzOffset(timeZone: string, baseTimeZone?: string): string {
  const time = tzDiffTime(timeZone, baseTimeZone);

  if (time.isEmpty) {
    return "local";
  }

  const sign = plus(time.hours + time.minutes, true);
  const hours = time.hours ? `${time.hours}h` : "";
  const delimiter = time.hours ? " " : "";
  const minutes = time.minutes ? `${delimiter}${Math.abs(time.minutes)}m` : "";

  return `${sign}${hours}${minutes}`;
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
 * Returns timezone diff in minutes.
 *
 * @param baseTimeZone Local if not specified.
 */
export function tzDiffMinutes(timeZone: string, baseTimeZone?: string): number {
  return toMinutes(
    tzDiff(timeZone, baseTimeZone)
  );
}

/**
 * Returns timezone diff as ITime.
 *
 * @param baseTimeZone Local if not specified.
 */
export function tzDiffTime(timeZone: string, baseTimeZone?: string): ITime {
  const offset = tzDiffHours(timeZone, baseTimeZone);
  const hours = Math.trunc(offset);
  const diffMin = tzDiffMinutes(timeZone, baseTimeZone);
  const minutes = diffMin - hours * 60;

  return new Time(hours, minutes);
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
    ? date.toLocaleString("en-US", { timeZone })
    : date.toLocaleString("en-US");

  return new Date(dateStr);
}

export function gmtStr(timeZone: string): string {
  return `GMT${utcOffset(timeZone)}`;
}

function plus(n: number, emptyForZero: boolean = false): string {
  return (n > 0 || !emptyForZero && n === 0) ? "+" : "";
}
