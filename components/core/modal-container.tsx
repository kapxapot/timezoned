import Modal from '@/components/core/modal';
import { Button, Navbar } from 'flowbite-react';
import { PropsWithChildren, ReactNode, useState } from 'react';

interface Props {
  formId?: string;
  buttonLabel?: string;
  buttonColor?: string;
  buttonIcon?: ReactNode;
  buttonDisabled?: boolean;
  buttonClassName?: string;
  modalTitle?: string;
  submitLabel?: string;
  submitDisabled?: boolean;
  cancelLabel?: string;
  noCancelButton?: boolean;
  inNavbar?: boolean;
  modalWidth?: string;
  onOpen?: () => void;
  onClose?: () => void;
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
    props.onClose?.();
  }

  function cancel() {
    setShow(false);

    props.onCancel?.();
    props.onClose?.();
  }

  function ButtonContent() {
    return (
      <div className="flex gap-1.5">
        {props.buttonIcon}
        <span>
          {props.buttonLabel ?? "Open modal"}
        </span>
      </div>
    )
  }

  function MCButton() {
    return (
      <Button
        color={props.buttonColor ?? "light"}
        disabled={props.buttonDisabled}
        size="sm"
        className={props.buttonClassName}
        onClick={open}
      >
        <ButtonContent />
      </Button>
    )
  }

  function MCNavbarLink() {
    return (
      <Navbar.Link
        href="#"
        className={props.buttonClassName}
        onClick={open}
      >
        <ButtonContent />
      </Navbar.Link>
    )
  }

  return (
    <>
      {props.inNavbar ? <MCNavbarLink /> : <MCButton />}

      <Modal
        formId={props.formId}
        show={show}
        title={props.modalTitle ?? props.buttonLabel ?? "No title"}
        submitLabel={props.submitLabel}
        submitDisabled={props.submitDisabled}
        cancelLabel={props.cancelLabel}
        noCancelButton={props.noCancelButton}
        width={props.modalWidth}
        onSubmit={submit}
        onCancel={cancel}
      >
        {props.children}
      </Modal>
    </>
  )
}
