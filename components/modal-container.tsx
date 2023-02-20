import Modal from '@/components/modal';
import { Button } from 'flowbite-react';
import { PropsWithChildren, useState } from 'react';

interface Props {
  buttonLabel?: string;
  modalTitle?: string;
  submitLabel?: string;
  cancelLabel?: string;
  onSubmit?: () => void;
  onCancel?: () => void;
}

export default function ModalContainer(props: PropsWithChildren<Props>) {
  const [show, setShow] = useState<boolean>(false);

  function open() {
    setShow(true);
  }

  function submit() {
    setShow(false);

    props.onSubmit?.();
  }

  function cancel() {
    setShow(false);

    props.onCancel?.();
  }

  return (
    <>
      <Button
        color="purple"
        onClick={open}
      >
        {props.buttonLabel ?? "Open modal"}
      </Button>
      <Modal
        show={show}
        title={props.modalTitle ?? props.buttonLabel ?? "No title"}
        submitLabel={props.submitLabel}
        cancelLabel={props.cancelLabel}
        onSubmit={submit}
        onCancel={cancel}
      >
        {props.children}
      </Modal>
    </>
  )
}
