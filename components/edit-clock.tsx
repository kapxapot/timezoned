import ClockForm from "./clock-form";
import Modal from "./core/modal";
import { ClockChange, IClock } from "@/lib/clock";
import { getTimeZone, sortTimeZones } from "@/lib/timezones";
import { TimeZone } from "@vvo/tzdb";

interface Props {
  show: boolean;
  timeZones: TimeZone[];
  clock: IClock;
  onEdit: (change: ClockChange) => void;
  onClose: () => void;
}

export default function EditClock(props: Props) {
  const formId = "editClock";
  const timeZones = getTimeZones();

  /**
   * Concatenates filtered timezones with the clock's timezone.
   */
  function getTimeZones(): TimeZone[] {
    const timeZones = [...props.timeZones];
    const clockTimeZone = getTimeZone(props.clock.timeZone);

    if (clockTimeZone) {
      timeZones.push(clockTimeZone);
    }

    return sortTimeZones(timeZones);
  }

  function saveClock(change: ClockChange) {
    props.onEdit(change);
  }

  return (
    <Modal
      formId={formId}
      show={props.show}
      title="Edit clock"
      submitLabel="Save"
      onSubmit={props.onClose}
      onCancel={props.onClose}
    >
      <ClockForm
        id={formId}
        clock={props.clock}
        timeZones={timeZones}
        onSubmit={saveClock}
      />
    </Modal>
  )
}
