import { TimeZone } from "@vvo/tzdb";
import { useState } from "react";
import { ClockData, createClock } from "./clock";
import ClockForm from "./clock-form";
import ModalContainer from "./modal-container";

interface Props {
  timeZones: TimeZone[];
  addClock: (clock: ClockData) => void;
}

export default function AddClock(props: Props) {
  const firstTimeZone = props.timeZones[0].name;

  const [timeZone, setTimeZone] = useState<string>(firstTimeZone);
  const [title, setTitle] = useState<string>("");

  function addClock() {
    props.addClock(
      createClock(timeZone, title)
    );
  }

  function reset() {
    setTimeZone(firstTimeZone);
    setTitle("");
  }

  return (
    <ModalContainer
      buttonLabel="Add clock"
      buttonDisabled={!props.timeZones.length}
      submitLabel="Add"
      onSubmit={addClock}
      onCancel={reset}
    >
      <ClockForm
        timeZones={props.timeZones}
        onTimeZoneChange={timeZone => setTimeZone(timeZone)}
        onTitleChange={title => setTitle(title)}
      />
    </ModalContainer>
  )
}
