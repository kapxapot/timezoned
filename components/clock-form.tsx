import { Label, Select, TextInput } from 'flowbite-react';
import { FormEvent } from 'react';
import { TimeZone } from '@vvo/tzdb';
import { tzStr } from '@/lib/timezones';

interface Props {
  id: string;
  timeZones: TimeZone[];
  onTimeZoneChange: (timeZone: string) => void;
  onTitleChange: (title: string) => void;
  onSubmit: () => void;
}

export default function ClockForm(props: Props) {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.onSubmit();
  }

  return (
    <form id={props.id} onSubmit={onSubmit}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="timezones" value="Timezone" />
        </div>
        <Select
          id="timezones"
          onChange={event => props.onTimeZoneChange(event.currentTarget.value)}
          required={true}
        >
          {props.timeZones.map(timeZone => (
            <option key={timeZone.name} value={timeZone.name}>
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
          id="title"
          maxLength={20}
          onChange={event => props.onTitleChange(event.target.value)}
        />
      </div>
    </form>
  )
}
