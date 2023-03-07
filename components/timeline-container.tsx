import { IClock } from "@/lib/clock";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import ModalContainer from "./modal-container";
import Timeline from "./timeline";

interface Props {
  clock: IClock;
  defaultClock: IClock;
}

export default function TimelineContainer(props: Props) {
  return (
    <ModalContainer
      buttonLabel="Timeline"
      buttonColor="light"
      buttonIcon={<CalendarDaysIcon className="w-5" />}
      modalTitle={props.clock.title + " Timeline"}
      submitLabel="Close"
      noCancelButton={true}
    >
      <Timeline
        clock={props.clock}
        baseClock={props.defaultClock}
      />
    </ModalContainer>
  );
}