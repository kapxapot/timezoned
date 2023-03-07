import Modal from '@/components/modal';
import { Button } from 'flowbite-react';
import { PropsWithChildren, ReactNode, useState } from 'react';

interface Props {
  formId?: string;
  buttonLabel?: string;
  buttonColor?: string;
  buttonIcon?: ReactNode;
  buttonDisabled?: boolean;
  modalTitle?: string;
  submitLabel?: string;
  cancelLabel?: string;
  onOpen?: () => void;
  onSubmit?: () => void;
  onCancel?: () => void;
  noCancelButton?: boolean;
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
        color={props.buttonColor ?? "purple"}
        disabled={props.buttonDisabled}
        onClick={open}
        size="sm"
      >
        {props.buttonIcon
          ? (
            <span className="mr-1.5">{props.buttonIcon}</span>
          )
          : null
        }
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
        noCancelButton={props.noCancelButton}
      >
        {props.children}
      </Modal>
    </>
  )
}
