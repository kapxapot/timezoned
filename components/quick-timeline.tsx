import { useState } from 'react';
import { Label } from 'flowbite-react';
import ModalContainer from './core/modal-container';
import Timeline from './timeline';
import TimeZoneAutocomplete from './timezone-autocomplete';
import ClockAlreadyAdded from './clock-already-added';
import { extractCity } from '@/lib/timezones';
import { CalendarDaysIcon } from '@heroicons/react/20/solid';

interface Props {
  timeZones: string[];
  addedTimeZones: string[];
  baseTimeZone: string;
  baseTitle: string;
  inNavbar?: boolean;
  onAddClock: (timeZone: string) => void;
}

export default function QuickTimeline(props: Props) {
  const [timeZone, setTimeZone] = useState(props.timeZones[0]);

  const alreadyAdded = props.addedTimeZones.some(tz => tz === timeZone);

  return (
    <ModalContainer
      modalTitle="Quick timeline"
      buttonLabel="Timeline"
      buttonIcon={<CalendarDaysIcon className="w-5" />}
      submitLabel="Add clock"
      submitDisabled={alreadyAdded}
      onSubmit={() => props.onAddClock(timeZone)}
      width="max-w-2xl"
      inNavbar={props.inNavbar}
    >
      <div className="mb-5">
        <div className="mb-2 block">
          <Label htmlFor="timeZone" value="Timezone" />
        </div>
        <TimeZoneAutocomplete
          id="timeZone"
          timeZones={props.timeZones}
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

      {alreadyAdded && <ClockAlreadyAdded />}
    </ModalContainer>
  )
}
