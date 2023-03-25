import { useState } from 'react';
import { Label } from 'flowbite-react';
import ModalContainer from './core/modal-container';
import Timeline from './timeline';
import TimeZoneAutocomplete from './timezone-autocomplete';
import ClockAlreadyAdded from './clock-already-added';
import { extractCity } from '@/lib/timezones';
import { CalendarDaysIcon } from '@heroicons/react/20/solid';
import { useAppContext } from './context/app-context';
import { ActionType } from './context/app-reducer';
import { IClock } from '@/lib/clock';

interface Props {
  defaultClock: IClock;
  inNavbar?: boolean;
  buttonClassName?: string;
}

export default function QuickTimeline(props: Props) {
  const { timeZones, activeTimeZones, dispatch } = useAppContext();
  const [timeZone, setTimeZone] = useState(timeZones[0]);

  const alreadyAdded = activeTimeZones.some(tz => tz === timeZone);

  function addClock() {
    dispatch({
      type: ActionType.AddTimeZone,
      payload: { timeZone }
    });
  }

  return (
    <ModalContainer
      modalTitle="Quick timeline"
      buttonLabel="Timeline"
      buttonIcon={<CalendarDaysIcon className="w-5" />}
      buttonClassName={props.buttonClassName}
      submitLabel="Add clock"
      submitDisabled={alreadyAdded}
      inNavbar={props.inNavbar}
      flexWidth={true}
      onSubmit={addClock}
    >
      <div className="mb-5">
        <div className="mb-2 block">
          <Label htmlFor="timeZone" value="Timezone" />
        </div>
        <TimeZoneAutocomplete
          id="timeZone"
          defaultValue={timeZone}
          onChange={setTimeZone}
        />
      </div>

      <Timeline
        baseTimeZone={props.defaultClock.timeZone}
        baseTitle={props.defaultClock.title}
        timeZone={timeZone}
        title={extractCity(timeZone) + " time"}
      />

      {alreadyAdded && <ClockAlreadyAdded />}
    </ModalContainer>
  )
}
