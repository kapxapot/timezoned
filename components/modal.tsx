import { Dialog, Transition } from '@headlessui/react';
import { Button } from 'flowbite-react';
import { Fragment, PropsWithChildren } from 'react';

interface Props {
  show: boolean;
  title: string;
  submitLabel?: string;
  cancelLabel?: string;
  onSubmit?: () => void;
  onCancel?: () => void;
}

export default function Modal(props: PropsWithChildren<Props>) {
    function submit()
    {
      props.onSubmit?.();
    }

    function cancel()
    {
      props.onCancel?.();
    }

    return (
    <Transition appear show={props.show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={cancel}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-4 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  {props.title}
                </Dialog.Title>

                {props.children}

                <div className="flex justify-end gap-3 mt-6 w-full">
                  <Button color="purple" onClick={submit}>{props.submitLabel ?? 'Submit'}</Button>
                  <Button color="gray" onClick={cancel}>{props.cancelLabel ?? 'Cancel'}</Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
