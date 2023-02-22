import Head from 'next/head';
import Clock from '@/components/clock';
import ModalContainer from '@/components/modal-container';
import { Label, Select } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { getTimezones } from '@/lib/timezones';

interface ClockData {
  timezone: string;
  title?: string;
}

export default function Home() {
  const [clocks, setClocks] = useState<ClockData[]>([]);
  const [timezones, setTimezones] = useState<string[]>([]);
  const [selectedTimezone, setSelectedTimezone] = useState<string>('');

  function onTimezoneSelected(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedTimezone(event.currentTarget.value);
  }

  function tzToClock(timezone: string): ClockData {
    return {
      timezone: timezone
    };
  };

  function addTimezone() {
    setClocks([...clocks, tzToClock(selectedTimezone)]);
  }

  useEffect(
    () => {
      const timezones = getTimezones();

      setTimezones(timezones);

      const local = {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        title: "Local Time"
      };

      setClocks([local, ...timezones.slice(0, 2).map(tz => tzToClock(tz))]);
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
        <ModalContainer
          buttonLabel="Add timezone"
          submitLabel="Add"
          onSubmit={addTimezone}
        >
          <div className="mb-2 block">
            <Label htmlFor="timezones" value="Timezone" />
          </div>
          <Select id="timezones" required={true} onChange={onTimezoneSelected}>
            {timezones.map((timezone) => (
              <option value={timezone} key={timezone}>{timezone}</option>
            ))}
          </Select>
        </ModalContainer>
      </nav>
      <main className="flex flex-wrap justify-center items-start p-5 gap-6 mt-2">
        {clocks.map(clock => (
          <Clock name={clock.title} timezone={clock.timezone} key={clock.timezone} />
        ))}
      </main>
    </>
  )
}
