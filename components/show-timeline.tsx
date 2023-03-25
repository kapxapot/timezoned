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
      flexWidth={true}
    >
      <Timeline
        baseTimeZone={props.defaultClock.timeZone}
        baseTitle={props.defaultClock.title}
        timeZone={props.clock.timeZone}
        title={props.clock.title + " time"}
      />
    </ModalContainer>
  );
}
