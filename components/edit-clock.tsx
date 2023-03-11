import { useState } from "react";
import ClockForm from "./clock-form";
import Modal from "./core/modal";
import ClockAlreadyAdded from "./clock-already-added";
import { ClockChange, IClock } from "@/lib/clock";

interface Props {
  show: boolean;
  clock: IClock;
  timeZones: string[];
  addedTimeZones: string[];
  onClose: () => void;
  onEdit: (change: ClockChange) => void;
}

export default function EditClock(props: Props) {
  const formId = "editClock";
  const [timeZone, setTimeZone] = useState("");

  const alreadyAdded = timeZone !== props.clock.timeZone
    && props.addedTimeZones.some(tz => tz === timeZone);

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
        timeZones={props.timeZones}
        addedTimeZones={props.addedTimeZones}
        onTimeZoneChange={setTimeZone}
        onSubmit={saveClock}
      />

      {alreadyAdded && <ClockAlreadyAdded />}
    </Modal>
  )
}
