import { IClock } from "@/lib/clock";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import ModalContainer from "./core/modal-container";
import Timeline from "./timeline";

interface Props {
  clock: IClock;
  defaultClock: IClock;
}

export default function ShowTimeline(props: Props) {
  return (
    <ModalContainer
      modalTitle={props.clock.title + " timeline"}
      buttonLabel="Timeline"
      buttonColor="light"
      buttonIcon={<CalendarDaysIcon className="w-5" />}
      submitLabel="Close"
      noCancelButton={true}
      modalWidth="max-w-2xl"
    >
      <Timeline
        timeZone={props.clock.timeZone}
        baseTimeZone={props.defaultClock.timeZone}
        title={props.clock.title + " time"}
        baseTitle={props.defaultClock.title}
      />
    </ModalContainer>
  );
}
