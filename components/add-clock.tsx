import { useState } from "react";
import { TimeZone } from "@vvo/tzdb";
import { IClock, Clock } from "@/lib/clock";
import ClockForm from "./clock-form";
import ModalContainer from "./modal-container";

interface Props {
  timeZones: TimeZone[];
  addClock: (clock: IClock) => void;
}

export default function AddClock(props: Props) {
  const id = "addClock";
  const firstTimeZone = props.timeZones[0].name;

  const [timeZone, setTimeZone] = useState<string>(firstTimeZone);
  const [title, setTitle] = useState<string>("");

  function addClock() {
    props.addClock(
      new Clock(timeZone, title)
    );
  }

  function reset() {
    setTimeZone(firstTimeZone);
    setTitle("");
  }

  return (
    <ModalContainer
      formId={id}
      buttonLabel="Add clock"
      buttonDisabled={!props.timeZones.length}
      submitLabel="Add"
      onOpen={reset}
    >
      <ClockForm
        id={id}
        timeZones={props.timeZones}
        onTimeZoneChange={timeZone => setTimeZone(timeZone)}
        onTitleChange={title => setTitle(title)}
        onSubmit={addClock}
      />
    </ModalContainer>
  )
}
