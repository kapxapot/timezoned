import { Button } from 'flowbite-react';
import { PropsWithChildren } from 'react';
import Modal from './modal';

interface Props {
  show: boolean;
  title: string;
  flexWidth?: boolean;
  submitLabel?: string;
  submitDisabled?: boolean;
  noCancelButton?: boolean;
  cancelLabel?: string;
  onSubmit?: () => void;
  onCancel?: () => void;
}

export default function PopupModal(props: PropsWithChildren<Props>) {
  function submit() {
    props.onSubmit?.();
  }

  function cancel() {
    props.onCancel?.();
  }

  return (
    <Modal
      show={props.show}
      title={props.title}
      flexWidth={props.flexWidth}
      onCancel={cancel}
    >
      {props.children}

      <div className="flex justify-end gap-3 mt-6 w-full">
        <Button
          color="purple"
          disabled={props.submitDisabled}
          onClick={submit}
        >
          {props.submitLabel ?? "Submit"}
        </Button>

        {!props.noCancelButton &&
          <Button
            color="gray"
            onClick={cancel}
          >
            {props.cancelLabel ?? "Cancel"}
          </Button>
        }
      </div>
    </Modal>
  )
}
