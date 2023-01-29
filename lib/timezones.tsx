import { timeZonesNames } from "@vvo/tzdb";

export function getTimezones(): string[] {
  return timeZonesNames;
}

export function gmtOffset(date: Date, timezone: string): string {
  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
  const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
  const offset = (tzDate.getTime() - utcDate.getTime()) / 60 / 1000 / 60;

  return offset >= 0
    ? '+' + offset.toString()
    : offset.toString();
}

export function localOffset(date: Date, timezone: string): string {
  const utcDate = new Date(date.toLocaleString('en-US'));
  const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
  const offset = (tzDate.getTime() - utcDate.getTime()) / 60 / 1000 / 60;

  if (offset === 0) {
    return 'local';
  }

  const offsetStr = offset > 0
    ? '+' + offset.toString()
    : offset.toString();

  return offsetStr + 'h diff';
}

export function tzDate(timezone: string): Date {
  const dateStr = new Date().toLocaleString("en-US", { timeZone: timezone });
  return new Date(dateStr);
}
