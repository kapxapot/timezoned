import { Label, Select, TextInput } from 'flowbite-react';
import { tzStr } from '@/lib/timezones';
import { TimeZone } from '@vvo/tzdb';

interface Props {
  timeZones: TimeZone[];
  onTimeZoneChange: (timeZone: string) => void;
  onTitleChange: (title: string) => void;
}

export default function ClockForm(props: Props) {
  return (
    <>
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
    </>
  );
}
