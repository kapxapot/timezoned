import Modal from '@/components/modal';
import { Button } from 'flowbite-react';
import { PropsWithChildren, useState } from 'react';

interface Props {
  formId: string;
  buttonLabel?: string;
  buttonDisabled?: boolean;
  modalTitle?: string;
  submitLabel?: string;
  cancelLabel?: string;
  onOpen?: () => void;
  onSubmit?: () => void;
  onCancel?: () => void;
}

export default function ModalContainer(props: PropsWithChildren<Props>) {
  const [show, setShow] = useState<boolean>(false);

  function open() {
    setShow(true);

    props.onOpen?.();
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
        disabled={props.buttonDisabled}
        onClick={open}
      >
        {props.buttonLabel ?? "Open modal"}
      </Button>
      <Modal
        formId={props.formId}
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
