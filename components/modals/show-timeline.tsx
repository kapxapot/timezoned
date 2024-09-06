import { IClock } from "@/lib/clock";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import ModalButton from "../core/modal-button";
import PopupModal from "../core/popup-modal";
import Timeline from "../timeline";

interface Props {
  clock: IClock;
  defaultClock: IClock;
  buttonDisabled?: boolean;
}

export default function ShowTimeline(props: Props) {
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
        buttonDisabled={props.buttonDisabled}
      />

      <PopupModal
        show={showModal}
        title={`${props.clock.title} timeline`}
        flexWidth={true}
        submitLabel="Close"
        noCancelButton={true}
        onSubmit={closeModal}
        onCancel={closeModal}
      >
        <Timeline
          baseTimeZone={props.defaultClock.timeZone}
          baseTitle={props.defaultClock.title}
          timeZone={props.clock.timeZone}
          title={`${props.clock.title} time`}
        />
      </PopupModal>
    </>
  );
}
