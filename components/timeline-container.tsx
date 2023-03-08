import { IClock } from "@/lib/clock";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import ModalContainer from "./core/modal-container";
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
      width="max-w-2xl"
    >
      <Timeline
        clock={props.clock}
        baseClock={props.defaultClock}
      />
    </ModalContainer>
  );
}
