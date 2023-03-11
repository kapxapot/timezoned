import ClockForm from './clock-form';
import ModalContainer from './core/modal-container';
import { IClock, Clock, ClockChange } from '@/lib/clock';
import { TimeZone } from '@vvo/tzdb';
import { ClockIcon } from '@heroicons/react/20/solid';

interface Props {
  timeZones: TimeZone[];
  addClock: (clock: IClock) => void;
  inNavbar?: boolean;
}

export default function AddClock(props: Props) {
  const formId = "addClock";

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
      buttonDisabled={!props.timeZones.length}
      submitLabel="Add"
      inNavbar={props.inNavbar}
    >
      <ClockForm
        id={formId}
        timeZones={props.timeZones}
        onSubmit={addClock}
      />
    </ModalContainer>
  )
}
