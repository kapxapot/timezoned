import Modal from '@/components/core/modal';
import { Button, Navbar } from 'flowbite-react';
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
  inNavbar?: boolean;
  className?: string;
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

  function buttonContent() {
    return (
      <div className={`flex gap-1.5 ${props.className}`}>
        {props.buttonIcon}
        <span>
          {props.buttonLabel ?? "Open modal"}
        </span>
      </div>
    )
  }

  function button() {
    return (
      <Button
        color={props.buttonColor ?? "light"}
        disabled={props.buttonDisabled}
        size="sm"
        className={props.className}
        onClick={open}
      >
        {buttonContent()}
      </Button>
    )
  }

  function navbarLink() {
    return (
      <Navbar.Link
        href="#"
        onClick={open}
      >
        {buttonContent()}
      </Navbar.Link>
    )
  }

  return (
    <>
      {props.inNavbar ? navbarLink() : button()}
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
