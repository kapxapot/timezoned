import Modal from '@/components/core/modal';
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
  submitDisabled?: boolean;
  cancelLabel?: string;
  onOpen?: () => void;
  onClose?: () => void;
  onSubmit?: () => void;
  onCancel?: () => void;
  noCancelButton?: boolean;
  width?: string;
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
    props.onClose?.();
  }

  function cancel() {
    setShow(false);

    props.onCancel?.();
    props.onClose?.();
  }

  return (
    <>
      <Button
        color={props.buttonColor ?? "purple"}
        disabled={props.buttonDisabled}
        onClick={open}
        size="sm"
      >
        {props.buttonIcon && (
          <span className="mr-1.5">
            {props.buttonIcon}
          </span>
        )}
        <span>
          {props.buttonLabel ?? "Open modal"}
        </span>
      </Button>
      <Modal
        formId={props.formId}
        show={show}
        title={props.modalTitle ?? props.buttonLabel ?? "No title"}
        submitLabel={props.submitLabel}
        submitDisabled={props.submitDisabled}
        cancelLabel={props.cancelLabel}
        onSubmit={submit}
        onCancel={cancel}
        noCancelButton={props.noCancelButton}
        width={props.width}
      >
        {props.children}
      </Modal>
    </>
  )
}
