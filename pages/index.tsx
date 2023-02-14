import Head from 'next/head';
import Clock from '@/components/clock';
import { Button, Modal } from 'flowbite-react'; 
import { useEffect, useState } from 'react';
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
        <Button onClick={openAddTimezoneModal}>
          Add timezone
        </Button>
      </nav>
      <main className="flex flex-wrap justify-center items-start p-5 gap-6 mt-2">
        <Clock name="Local Time" />
        {timezones.map((timezone) => (
          <Clock name={timezone} timezone={timezone} key={timezone} />
        ))}
      </main>
      <Modal dismissible={true} show={showAddTimezoneModal} onClose={addTimezoneModalCancel}>
        <Modal.Header>
          Add timezone
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="w-full flex justify-end gap-4">
            <Button onClick={addTimezoneModalOk}>Save</Button>
            <Button color="gray" onClick={addTimezoneModalCancel}>Cancel</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}
