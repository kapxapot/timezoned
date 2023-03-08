import ClockForm from './clock-form';
import ModalContainer from './core/modal-container';
import { IClock, Clock, ClockChange } from '@/lib/clock';
import { TimeZone } from '@vvo/tzdb';

interface Props {
  timeZones: TimeZone[];
  addClock: (clock: IClock) => void;
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
      buttonDisabled={!props.timeZones.length}
      submitLabel="Add"
    >
      <ClockForm
        id={formId}
        timeZones={props.timeZones}
        onSubmit={addClock}
      />
    </ModalContainer>
  )
}
