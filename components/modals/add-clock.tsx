import { useState } from 'react';
import ClockForm from '../clock-form';
import { Clock, ClockChange } from '@/lib/clock';
import { ClockIcon } from '@heroicons/react/20/solid';
import { useAppContext } from '../context/app-context';
import ModalButton from '../core/modal-button';
import Modal from '../core/modal';

interface Props {
  inNavbar?: boolean;
  buttonClassName?: string;
}

export default function AddClock(props: Props) {
  const { timeZones, dispatch } = useAppContext();
  const initialTimeZone = timeZones[0];
  const [timeZone, setTimeZone] = useState(initialTimeZone);
  const [showModal, setShowModal] = useState(false);

  function addClock(change: ClockChange) {
    closeModal();

    dispatch({
      type: "Add",
      clock: Clock.fromChange(change)
    });
  }

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setTimeZone(initialTimeZone);
  }

  return (
    <>
      <ModalButton
        buttonLabel="Add clock"
        buttonIcon={<ClockIcon className="w-5" />}
        buttonClassName={props.buttonClassName}
        inNavbar={props.inNavbar}
        onClick={openModal}
      />

      <Modal
        show={showModal}
        title="Add clock"
        onCancel={closeModal}
      >
        <ClockForm
          timeZone={timeZone}
          submitLabel="Add"
          onTimeZoneChange={setTimeZone}
          onSubmit={addClock}
          onCancel={closeModal}
        />
      </Modal>
    </>
  )
}
