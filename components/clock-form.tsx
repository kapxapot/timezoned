import { FormEvent, useState } from 'react';
import { Label, TextInput } from 'flowbite-react';
import TimeZoneAutocomplete from './timezone-autocomplete';
import { ClockChange, IClock } from '@/lib/clock';
import { cast } from '@/lib/common';

interface Props {
  id: string;
  clock?: IClock;
  timeZones: string[];
  addedTimeZones: string[];
  onTimeZoneChange?: (timeZone: string) => void;
  onSubmit: (change: ClockChange) => void;
}

export default function ClockForm(props: Props) {
  const [timeZone, setTimeZone] = useState(props.clock?.timeZone || props.timeZones[0]);

  props.onTimeZoneChange?.(timeZone);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    props.onSubmit(
      cast<ClockChange>(formJson)
    );
  }

  function onTimeZoneChange(timeZone: string) {
    setTimeZone(timeZone);
    props.onTimeZoneChange?.(timeZone);
  }

  return (
    <form
      className="flex flex-col gap-4"
      id={props.id}
      onSubmit={onSubmit}
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="timeZone" value="Timezone" />
        </div>
        <TimeZoneAutocomplete
          id="timeZone"
          timeZones={props.timeZones}
          defaultValue={timeZone}
          onChange={onTimeZoneChange}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="clockTitle" value="Title" />
        </div>
        <TextInput
          id="clockTitle"
          name="title"
          maxLength={20}
          defaultValue={props.clock ? props.clock.title : ""}
        />
      </div>
    </form>
  )
}
