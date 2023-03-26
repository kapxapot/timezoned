import { useState } from "react";
import ClockForm from "../clock-form";
import Modal from "../core/modal";
import { ClockChange, IClock } from "@/lib/clock";

interface Props {
  show: boolean;
  clock: IClock;
  onSubmit: (change: ClockChange) => void;
  onCancel: () => void;
}

export default function EditClock(props: Props) {
  const [timeZone, setTimeZone] = useState(props.clock.timeZone);

  return (
    <Modal
      show={props.show}
      title="Edit clock"
      onCancel={props.onCancel}
    >
      <ClockForm
        clock={props.clock}
        timeZone={timeZone}
        submitLabel="Save"
        onTimeZoneChange={setTimeZone}
        onSubmit={props.onSubmit}
        onCancel={props.onCancel}
      />
    </Modal>
  )
}
