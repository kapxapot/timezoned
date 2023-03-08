import { Label, TextInput } from 'flowbite-react';
import { FormEvent } from 'react';
import { TimeZone } from '@vvo/tzdb';
import { ClockChange, IClock } from '@/lib/clock';
import { cast } from '@/lib/common';
import TimeZoneAutocomplete from './timezone-autocomplete';

interface Props {
  id: string;
  timeZones: TimeZone[];
  clock?: IClock;
  onSubmit: (change: ClockChange) => void;
}

export default function ClockForm(props: Props) {
  const timeZoneNames = props.timeZones.map(tz => tz.name);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    props.onSubmit(
      cast<ClockChange>(formJson)
    );
  }

  return (
    <form id={props.id} onSubmit={onSubmit} className="flex flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="timeZone" value="Timezone" />
        </div>
        <TimeZoneAutocomplete
          id="timeZone"
          timeZoneNames={timeZoneNames}
          defaultValue={props.clock?.timeZone}
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
