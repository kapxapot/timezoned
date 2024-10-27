import { IClock } from "@/lib/clock";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import ModalButton from "../core/modal-button";
import PopupModal from "../core/popup-modal";
import Timeline from "../timeline";
import { useNow } from "@/hooks/useNow";

interface Props {
  clock: IClock;
  defaultClock: IClock;
  buttonDisabled?: boolean;
}

export default function ShowTimeline({ clock, defaultClock, buttonDisabled }: Props) {
  const { curHour } = useNow();
  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <>
      <ModalButton
        buttonLabel="Timeline"
        buttonIcon={<CalendarDaysIcon className="w-5" />}
        onClick={openModal}
        buttonDisabled={buttonDisabled}
      />

      <PopupModal
        show={showModal}
        title={`${clock.title} timeline`}
        flexWidth={true}
        submitLabel="Close"
        noCancelButton={true}
        onSubmit={closeModal}
        onCancel={closeModal}
      >
        <Timeline
          curHour={curHour}
          baseTimeZone={defaultClock.timeZone}
          baseTitle={defaultClock.title}
          timeZones={[clock.timeZone]}
          titles={[`${clock.title} time`]}
        />
      </PopupModal>
    </>
  );
}
