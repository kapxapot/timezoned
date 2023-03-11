import { useState } from 'react';
import ModalContainer from './core/modal-container';
import Timeline from './timeline';
import { extractCity } from '@/lib/timezones';
import TimeZoneAutocomplete from './timezone-autocomplete';
import { Label } from 'flowbite-react';
import { CalendarDaysIcon } from '@heroicons/react/20/solid';
import { TimeZone } from '@vvo/tzdb';
import ClockAlreadyAdded from './clock-already-added';

interface Props {
  timeZoneNames: string[];
  filteredTimeZones: TimeZone[];
  baseTimeZone: string;
  baseTitle: string;
  onAddClock: (timeZone: string) => void;
  inNavbar?: boolean;
}

export default function QuickTimeline(props: Props) {
  const [timeZone, setTimeZone] = useState(props.timeZoneNames[0]);

  const canAddClock = props.filteredTimeZones
    .map(tz => tz.name)
    .some(tzName => tzName === timeZone);

  return (
    <ModalContainer
      modalTitle="Quick timeline"
      buttonLabel="Timeline"
      buttonIcon={<CalendarDaysIcon className="w-5" />}
      submitLabel="Add clock"
      submitDisabled={!canAddClock}
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

      {timeZone && !canAddClock && (
        <ClockAlreadyAdded />
      )}
    </ModalContainer>
  )
}
