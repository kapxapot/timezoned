import { ChangeEvent, useState } from 'react';
import ModalContainer from './core/modal-container';
import { Label, TextInput } from 'flowbite-react';
import { CogIcon } from '@heroicons/react/20/solid';
import { TimeZone } from '@vvo/tzdb';
import { getTimeZoneByAbbr, toMinutes, tzDiff, tzDiffHours } from '@/lib/timezones';
import { justifyBy } from '@/lib/common';

interface Props {
  timeZones: TimeZone[];
  baseTimeZone: string;
  onAddClock: (timeZone: string) => void;
}

export default function TimeParser(props: Props) {
  const [rawTime, setRawTime] = useState("");
  const [time, setTime] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [localTime, setLocalTime] = useState("");

  function padMinutes(minutes: number): string {
    return String(minutes).padStart(2, "0");
  }

  function rawTimeChanged(event: ChangeEvent<HTMLInputElement>) {
    var rawTime = event.target.value;

    setRawTime(rawTime);

    const regex = /^(([0-1]?[0-9])|(2[0-4]))(:([0-5]?[0-9]))?(\s+)?((a|p)m)?((\s+)?([a-z]+))?$/;
    const match = rawTime.trim().toLowerCase().match(regex);

    if (!match) {
      reset();
      return;
    }

    let hours = Number(match[1]);
    const minutes = match[5] ? Number(match[5]) : 0;
    const ampm = match[7] ?? "";
    const tzAbbr = match[11] ?? "";

    if (ampm && hours > 12) {
      reset();
      return;
    }

    if (ampm === "am") {
      hours = hours % 12;
    } else if (ampm === "pm") {
      hours = hours % 12 + 12;
    }

    setTime(String(hours) + ":" + padMinutes(minutes));

    const timeZone = getTimeZoneByAbbr(tzAbbr);
    const timeZoneStr = timeZone?.name ?? "";

    setTimeZone(timeZoneStr);

    if (timeZone) {
      const offset = tzDiffHours(timeZone.name, props.baseTimeZone);
      const offsetHours = Math.trunc(offset);
      const diff = tzDiff(timeZone.name, props.baseTimeZone);
      const offsetMinutes = toMinutes(diff) - offsetHours * 60;

      const finalMinutes = justifyBy(minutes + offsetMinutes, 60);
      const finalHours = justifyBy(hours + offsetHours + Math.trunc((minutes + offsetMinutes) / 60), 24);

      setLocalTime(`${finalHours}:${padMinutes(finalMinutes)}`);
    } else {
      setLocalTime("");
    }
  }

  function reset() {
    setTime("");
    setTimeZone("");
    setLocalTime("");
  }

  function fullReset() {
    reset();
    setRawTime("");
  }

  const canAddClock = props.timeZones
    .map(tz => tz.name)
    .some(tzName => tzName === timeZone);

  return (
    <ModalContainer
      buttonLabel="Time parser"
      buttonIcon={<CogIcon className="w-5" />}
      submitLabel="Add clock"
      submitDisabled={!canAddClock}
      onSubmit={() => props.onAddClock(timeZone)}
      onClose={fullReset}
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="rawTime" value="Time" />
        </div>
        <TextInput
          id="rawTime"
          helperText={(
            <span>
              Type a time string with a timezone, e.g.: &quot;12:00PM UTC&quot;
            </span>
          )}
          value={rawTime}
          onChange={rawTimeChanged}
        />
        {time && (
          <div className="mt-5">
            <div>Time: {time}</div>
            {timeZone && (
              <div>Timezone: {timeZone}</div>
            )}
            {localTime && (
              <div>My time: {localTime}</div>
            )}
          </div>
        )}
      </div>
    </ModalContainer>
  )
}
