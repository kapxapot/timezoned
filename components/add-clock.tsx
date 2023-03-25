import { useState } from 'react';
import ClockForm from './clock-form';
import ModalContainer from './core/modal-container';
import ClockAlreadyAdded from './clock-already-added';
import { Clock, ClockChange } from '@/lib/clock';
import { ClockIcon } from '@heroicons/react/20/solid';
import { useAppContext } from './context/app-context';
import { ActionType } from './context/app-reducer';

interface Props {
  inNavbar?: boolean;
  buttonClassName?: string;
}

export default function AddClock(props: Props) {
  const formId = "addClock";
  const { activeTimeZones, dispatch } = useAppContext();
  const [timeZone, setTimeZone] = useState("");

  const alreadyAdded = activeTimeZones.some(tz => tz === timeZone);

  function addClock(change: ClockChange) {
    dispatch({
      type: ActionType.Add,
      payload: {
        clock: Clock.fromChange(change)
      }
    });
  }

  function reset() {
    setTimeZone("");
  }

  return (
    <ModalContainer
      formId={formId}
      buttonLabel="Add clock"
      buttonIcon={<ClockIcon className="w-5" />}
      buttonClassName={props.buttonClassName}
      submitLabel="Add"
      submitDisabled={alreadyAdded}
      inNavbar={props.inNavbar}
      onClose={reset}
    >
      <ClockForm
        id={formId}
        onTimeZoneChange={setTimeZone}
        onSubmit={addClock}
      />

      {alreadyAdded && <ClockAlreadyAdded />}
    </ModalContainer>
  )
}
