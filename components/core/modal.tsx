import { Fragment, PropsWithChildren } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';

interface Props {
  show: boolean;
  title: string;
  flexWidth?: boolean;
  onCancel?: () => void;
}

export default function Modal({ show, title, flexWidth, onCancel, children }: PropsWithChildren<Props>) {
  function cancel() {
    onCancel?.();
  }

  return (
    <Transition appear show={show} as={Fragment}>
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
          <div className="flex min-h-full items-start justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={`${flexWidth ? "max-w-full" : "w-full max-w-md"} transform rounded-md bg-white dark:bg-gray-800 p-4 text-left align-middle shadow-xl transition-all`}>
                <Dialog.Title
                  as="div"
                  className="flex items-start justify-between mb-4"
                >
                  <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                    {title}
                  </h3>

                  <button
                    aria-label="Close"
                    className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={cancel}
                    tabIndex={-1}
                    type="button"
                  >
                    <XMarkIcon
                      className="w-5"
                    />
                  </button>
                </Dialog.Title>

                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
