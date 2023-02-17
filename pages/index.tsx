import Head from 'next/head';
import Clock from '@/components/clock';
import { Dialog, Transition } from '@headlessui/react';
import { Button, Label, Select } from 'flowbite-react';
import { Fragment, useEffect, useState } from 'react';
import { getTimezones } from '@/lib/timezones';

export default function Home() {
  const [clocks, setClocks] = useState<string[]>([]);
  const [timezones, setTimezones] = useState<string[]>([]);
  const [showAddTimezoneModal, setShowTimezoneModal] = useState<boolean>(false);
  const [selectedTimezone, setSelectedTimezone] = useState<string>('');

  function openAddTimezoneModal() {
    setShowTimezoneModal(true);
  }

  function addTimezoneModalOk() {
    setShowTimezoneModal(false);

    setClocks([...clocks, selectedTimezone]);
  }

  function addTimezoneModalCancel() {
    setShowTimezoneModal(false);
  }

  function onTimezoneSelected(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedTimezone(event.currentTarget.value);
  }

  useEffect(
    () => {
      const timezones = getTimezones();

      setTimezones(timezones);
      setClocks(timezones.slice(0, 2));
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
        <Button color="purple" onClick={openAddTimezoneModal}>Add timezone</Button>
      </nav>
      <main className="flex flex-wrap justify-center items-start p-5 gap-6 mt-2">
        <Clock name="Local Time" />
        {clocks.map((timezone) => (
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-4 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-4"
                  >
                    Add timezone
                  </Dialog.Title>

                  <div className="mb-2 block">
                    <Label htmlFor="timezones" value="Timezone" />
                  </div>
                  <Select id="timezones" required={true} onChange={onTimezoneSelected}>
                    {timezones.map((timezone) => (
                      <option>{timezone}</option>
                    ))}
                  </Select>

                  <div className="flex justify-end gap-3 mt-6 w-full">
                    <Button color="purple" onClick={addTimezoneModalOk}>Add</Button>
                    <Button color="gray" onClick={addTimezoneModalCancel}>Cancel</Button>
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
