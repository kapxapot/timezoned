import { ChangeEvent, useState } from 'react';
import { Label, TextInput } from 'flowbite-react';
import ClockAlreadyAdded from '../bits/clock-already-added';
import { filterTimeZones, getTimeZoneByAbbr, tzDiffTime } from '@/lib/timezones';
import { justifyBy } from '@/lib/common';
import { CogIcon } from '@heroicons/react/20/solid';
import { TimeZone } from '@vvo/tzdb';
import { useAppContext } from '../context/app-context';
import { ActionType } from '../context/app-reducer';
import PopupModal from '../core/popup-modal';
import ModalButton from '../core/modal-button';

interface Props {
  baseTimeZone: string;
  inNavbar?: boolean;
  buttonClassName?: string;
}

export default function TimeConverter(props: Props) {
  const { activeTimeZones, dispatch } = useAppContext()

  const [rawTime, setRawTime] = useState("");
  const [time, setTime] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [matchingTimeZones, setMatchingTimeZones] = useState("");
  const [localTime, setLocalTime] = useState("");

  const [showModal, setShowModal] = useState(false);

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
    const ampm = match[7] ?? null;
    const tz = match[11] ?? null;

    if (ampm && hours > 12) {
      reset();
      return;
    }

    if (ampm === "am") {
      hours = hours % 12;
    } else if (ampm === "pm") {
      hours = hours % 12 + 12;
    }

    setTime(
      formatTime(hours, minutes)
    );

    const timeZone = checkTimeZone(tz);

    if (!timeZone) {
      setTimeZone("");
      setLocalTime("");
      return;
    }

    setTimeZone(timeZone.name);

    const time = tzDiffTime(props.baseTimeZone, timeZone.name);

    const totalMinutes = minutes + time.minutes;
    const minuteHours = Math.trunc(totalMinutes / 60);

    const resultMinutes = justifyBy(totalMinutes, 60);
    const resultHours = justifyBy(hours + time.hours + minuteHours, 24);

    setLocalTime(
      formatTime(resultHours, resultMinutes)
    );
  }

  function formatTime(hours: number, minutes: number): string {
    return `${hours}:${padMinutes(minutes)}`;
  }

  function checkTimeZone(tz: string): TimeZone | null {
    setMatchingTimeZones("");

    if (!tz) {
      return null;
    }

    const timeZone = getTimeZoneByAbbr(tz);

    if (timeZone) {
      return timeZone;
    }

    const matchingTimeZones = filterTimeZones(tz);
    const tzCount = matchingTimeZones.length;

    if (tzCount < 2) {
      return tzCount
        ? matchingTimeZones[0]
        : null;
    }

    const names = tzCount < 4
      ? matchingTimeZones.map(tz => tz.name).join(", ")
      : "";

    setMatchingTimeZones(
      `${tzCount} matching timezones${names ? `: ${names}` : ""}`
    );

    return null;
  }

  function reset() {
    setTime("");
    setTimeZone("");
    setMatchingTimeZones("");
    setLocalTime("");
  }

  function fullReset() {
    reset();
    setRawTime("");
  }

  const alreadyAdded = !!timeZone && activeTimeZones.some(tz => tz === timeZone);

  function addClock() {
    const action = {
      type: ActionType.AddTimeZone,
      payload: { timeZone }
    };

    closeModal()

    dispatch(action);
  }

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    fullReset();
  }

  return (
    <>
      <ModalButton
        buttonLabel="Converter"
        buttonIcon={<CogIcon className="w-5" />}
        buttonClassName={props.buttonClassName}
        inNavbar={props.inNavbar}
        onClick={openModal}
      />

      <PopupModal
        show={showModal}
        title="Time converter"
        submitLabel="Add clock"
        submitDisabled={!timeZone || alreadyAdded}
        onSubmit={addClock}
        onCancel={closeModal}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="rawTime" value="Time" />
          </div>
          <TextInput
            autoComplete="off"
            id="rawTime"
            placeholder="12:00PM UTC"
            value={rawTime}
            onChange={rawTimeChanged}
          />
          {time &&
            <>
              <div className="mt-5">Time: {time}</div>

              {timeZone &&
                <div>Timezone: {timeZone}</div>
              }

              {matchingTimeZones &&
                <div>{matchingTimeZones}</div>
              }

              {localTime &&
                <div className="mt-2">My time: {localTime}</div>
              }

              {alreadyAdded && <ClockAlreadyAdded />}
            </>
          }
        </div>
      </PopupModal>
    </>
  )
}
