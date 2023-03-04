import { Label, Select, TextInput } from 'flowbite-react';
import { FormEvent } from 'react';
import { TimeZone } from '@vvo/tzdb';
import { tzStr } from '@/lib/timezones';
import { ClockChange, IClock } from '@/lib/clock';
import { cast } from '@/lib/common';

interface Props {
  id: string;
  timeZones: TimeZone[];
  clock?: IClock;
  onSubmit: (change: ClockChange) => void;
}

export default function ClockForm(props: Props) {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    props.onSubmit(
      cast<ClockChange>(formJson)
    );
  }

  return (
    <form id={props.id} onSubmit={onSubmit}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="timezones" value="Timezone" />
        </div>
        <Select
          name="timeZone"
          defaultValue={props.clock ? props.clock.timeZone : ""}
          required={true}
        >
          {props.timeZones.map(timeZone => (
            <option
              key={timeZone.name}
              value={timeZone.name}
            >
              {tzStr(timeZone)}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Title" />
        </div>
        <TextInput
          name="title"
          maxLength={20}
          defaultValue={props.clock ? props.clock.title : ""}
        />
      </div>
    </form>
  )
}
