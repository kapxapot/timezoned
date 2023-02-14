import Head from 'next/head';
import Clock from '@/components/clock';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react';
import { getTimezones } from '@/lib/timezones';

export default function Home() {
  const [timezones, setTimezones] = useState<string[]>([]);
  const [showAddTimezoneModal, setShowTimezoneModal] = useState<boolean>(false);

  function openAddTimezoneModal() {
    setShowTimezoneModal(true);
  }

  function addTimezoneModalOk() {
    setShowTimezoneModal(false);
  }

  function addTimezoneModalCancel() {
    setShowTimezoneModal(false);
  }

  useEffect(
    () => {
      setTimezones(getTimezones().slice(0, 2));
    },
    []
  );

  return (
    <>
      <Head>
        <title>Timezoned</title>
        <meta name="description" content="Timezone helper" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="flex space-x-2 justify-center mt-5">
        <button
          type="button"
          onClick={openAddTimezoneModal}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Add timezone
        </button>
      </nav>
      <main className="flex flex-wrap justify-center items-start p-5 gap-6 mt-2">
        <Clock name="Local Time" />
        {timezones.map((timezone) => (
          <Clock name={timezone} timezone={timezone} key={timezone} />
        ))}
      </main>
      <Transition appear show={showAddTimezoneModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={addTimezoneModalCancel}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={addTimezoneModalOk}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
