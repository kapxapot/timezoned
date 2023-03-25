import { useState } from "react";
import ClockForm from "./clock-form";
import Modal from "./core/modal";
import ClockAlreadyAdded from "./clock-already-added";
import { ClockChange, IClock } from "@/lib/clock";
import { extractCity } from "@/lib/timezones";
import { useAppContext } from "./context/app-context";
import { ActionType } from "./context/app-reducer";

interface Props {
  show: boolean;
  clock: IClock;
  onClose: () => void;
}

export default function EditClock(props: Props) {
  const formId = "editClock";
  const { activeTimeZones, dispatch } = useAppContext();
  const [timeZone, setTimeZone] = useState("");

  const alreadyAdded = timeZone !== props.clock.timeZone
    && activeTimeZones.some(tz => tz === timeZone);

  function saveClock(change: ClockChange) {
    if (!change.title) {
      change.title = extractCity(change.timeZone);
    }

    dispatch({
      type: ActionType.Edit,
      payload: {
        clock: props.clock,
        change
      }
    });
  }

  return (
    <Modal
      formId={formId}
      show={props.show}
      title="Edit clock"
      submitLabel="Save"
      submitDisabled={alreadyAdded}
      onSubmit={props.onClose}
      onCancel={props.onClose}
    >
      <ClockForm
        id={formId}
        clock={props.clock}
        onTimeZoneChange={setTimeZone}
        onSubmit={saveClock}
      />

      {alreadyAdded && <ClockAlreadyAdded />}
    </Modal>
  )
}
