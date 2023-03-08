import { useState } from 'react';
import ModalContainer from './core/modal-container';
import Timeline from './timeline';
import { extractCity } from '@/lib/timezones';
import TimeZoneAutocomplete from './timezone-autocomplete';
import { Label } from 'flowbite-react';

interface Props {
  timeZoneNames: string[];
  baseTimeZone: string;
  baseTitle: string;
}

export default function QuickTimeline(props: Props) {
  const [timeZone, setTimeZone] = useState(props.timeZoneNames[0]);

  return (
    <ModalContainer
      buttonLabel="Quick timeline"
      submitLabel="Close"
      noCancelButton={true}
    >
      <div className="mb-5">
        <div className="mb-2 block">
          <Label htmlFor="timeZone" value="Timezone" />
        </div>
        <TimeZoneAutocomplete
          id="timeZone"
          timeZoneNames={props.timeZoneNames}
          defaultValue={timeZone}
          onChange={setTimeZone}
        />
      </div>

      <Timeline
        timeZone={timeZone}
        baseTimeZone={props.baseTimeZone}
        title={extractCity(timeZone) + " time"}
        baseTitle={props.baseTitle}
      />
    </ModalContainer>
  )
}
