import { useState } from 'react';
import ClockForm from './clock-form';
import ModalContainer from './core/modal-container';
import ClockAlreadyAdded from './clock-already-added';
import { IClock, Clock, ClockChange } from '@/lib/clock';
import { ClockIcon } from '@heroicons/react/20/solid';

interface Props {
  timeZones: string[];
  addedTimeZones: string[];
  inNavbar?: boolean;
  addClock: (clock: IClock) => void;
}

export default function AddClock(props: Props) {
  const formId = "addClock";
  const [timeZone, setTimeZone] = useState("");

  const alreadyAdded = props.addedTimeZones.some(tz => tz === timeZone);

  function addClock(change: ClockChange) {
    props.addClock(
      Clock.fromChange(change)
    );
  }

  return (
    <ModalContainer
      formId={formId}
      buttonLabel="Add clock"
      buttonIcon={<ClockIcon className="w-5" />}
      submitLabel="Add"
      submitDisabled={alreadyAdded}
      inNavbar={props.inNavbar}
      onCancel={() => setTimeZone("")}
    >
      <ClockForm
        id={formId}
        timeZones={props.timeZones}
        addedTimeZones={props.addedTimeZones}
        onTimeZoneChange={setTimeZone}
        onSubmit={addClock}
      />

      {alreadyAdded && <ClockAlreadyAdded />}
    </ModalContainer>
  )
}
