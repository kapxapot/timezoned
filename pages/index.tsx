import Head from 'next/head';
import { Flowbite } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { TimeZone } from "@vvo/tzdb";
import { save, load } from '@/lib/storage';
import { sortedTimeZones } from '@/lib/timezones';
import { Clock, ClockData, createClock } from '@/components/clock';
import { flowbiteTheme } from '@/components/flowbite-theme';
import AddClock from '@/components/add-clock';

export default function Home() {
  const [clocks, setClocks] = useState<ClockData[]>([]);
  const [timeZones] = useState<TimeZone[]>(sortedTimeZones);

  const filteredTimeZones = timeZones.filter(
    tz => !clocks.some(clock => clock.timeZone === tz.name)
  );

  function filterClocks(clocks: ClockData[]): ClockData[] {
    return clocks.filter(clock => !clock.default);
  }

  function addClock(clock: ClockData) {
    saveAndSetClocks([...clocks, clock]);
  }

  function editClock(clock: ClockData) {
    console.log("edit clock: " + clock.timeZone);
  }

  function deleteClock(clockToDelete: ClockData) {
    saveAndSetClocks(
      clocks.filter(clock => clock !== clockToDelete)
    );
  }

  function saveAndSetClocks(clocks: ClockData[]) {
    save("clocks", filterClocks(clocks));

    setClocks(clocks);
  }

  useEffect(
    () => {
      const storedClocks = filterClocks(
        load("clocks") ?? []
      );

      const localClock = createClock(
        Intl.DateTimeFormat().resolvedOptions().timeZone,
        "Local Time",
        true
      );

      setClocks([localClock, ...storedClocks]);
    },
    []
  );

  return (
    <Flowbite theme={flowbiteTheme}>
      <Head>
        <title>TimeZoned</title>
        <meta name="description" content="Time zone helper" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="flex space-x-2 justify-center mt-5">
        <AddClock
          timeZones={filteredTimeZones}
          addClock={addClock}
        />
      </nav>
      <main className="flex flex-wrap justify-center items-start p-5 gap-6 mt-2">
        {clocks.map(clock => (
          <Clock
            data={clock}
            key={clock.id ?? clock.timeZone}
            onDelete={deleteClock}
            onEdit={editClock}
          />
        ))}
      </main>
    </Flowbite>
  )
}
